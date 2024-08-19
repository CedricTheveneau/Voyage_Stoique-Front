import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET;

export function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.redirect("/login");
  }

  try {
    jwt.verify(token, tokenSecret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect("/login");
  }
}

export const config = {
  matcher: "/create-kard",
};