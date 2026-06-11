import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Missing _type in webhook payload", { status: 400 });
    }

    // Next 16 requires a cache-life profile; "max" matches force-cache fetches
    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: true, tag: body._type });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Webhook error",
      { status: 500 },
    );
  }
}
