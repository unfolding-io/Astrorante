import type { APIRoute } from "astro";
import {
  MAILCHIMP_SERVER_PREFIX,
  MAILCHIMP_LIST_ID,
  getSecret,
} from "astro:env/server";

interface MailchimpListEntry {
  url: string;
  data: string;
}

const MAILCHIMP_API_KEY = getSecret("MAILCHIMP_API_KEY");
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID)
    return Response.json({
      error: "Missing MailChimp configuration, please check your .env file.",
    });

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
  };

  const {
    email,
    list,
    first_name,
    last_name,
    include_main_list,
    status,
    tags,
  } = await request.json();

  if (!email || email === "")
    return new Response(
      JSON.stringify({
        message: "missing email",
      }),
      {
        status: 404,
      },
    );

  let lists: MailchimpListEntry[] = list
    ? [
        {
          url: `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${list}/members/${email.toLowerCase()}`,
          data: JSON.stringify({
            email_address: email,
            status_if_new: status,
            merge_fields: {
              FNAME: first_name,
              LNAME: last_name,
            },
            tags: tags,
          }),
        },
      ]
    : [];

  if (include_main_list || !list) {
    lists = [
      ...lists,
      {
        url: `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${email.toLowerCase()}`,
        data: JSON.stringify({
          email_address: email,
          merge_fields: {
            FNAME: first_name,
            LNAME: last_name,
          },
          status_if_new: "pending",
          tags: tags,
        }),
      },
    ];
  }

  try {
    const result = await Promise.all(
      lists.map(async (data) => {
        const resp = await fetch(data.url, {
          method: "PUT",
          headers: headers,
          body: data.data,
        });
        return resp.json();
      }),
    );

    if (result.length === 1) {
      const response = result[0];

      return new Response(
        JSON.stringify({
          message: "ok",
          status: response.status,
        }),
        {
          status: 200,
        },
      );
    }

    const allSubscribed = result.every(
      (response) =>
        response.status === "subscribed" || response.status === "pending",
    );

    return new Response(
      JSON.stringify({
        message: "ok",
        status: allSubscribed ? "pending" : "error",
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.debug(error);
    return new Response(
      JSON.stringify({
        message: "error",
      }),
      {
        status: 500,
      },
    );
  }
};
