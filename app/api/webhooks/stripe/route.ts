import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
 
if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error("STRIPE_SECRET_KEY is not set");
}
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 
export async function POST(req: NextRequest) {
	const signature = req.headers.get("stripe-signature");
	if (!signature) {
		return new NextResponse("Missing stripe-signature header", { status: 400 });
	}
 
	const body = Buffer.from(await req.arrayBuffer());
 
	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET as string,
		);
	} catch {
		return new NextResponse("Invalid signature", { status: 400 });
	}
 
	if (event.type === "checkout.session.completed") {
		console.log("Great! Cash for us. Event: checkout.session.completed");
		// You would update your database here to show the user has paid.
	}
 
	return NextResponse.json({ received: true });
}