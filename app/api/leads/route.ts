import { NextResponse } from "next/server";

import { leads } from "@/lib/mockData";

export function GET() {
  return NextResponse.json({ leads });
}
