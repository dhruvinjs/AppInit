import { NextResponse } from "next/server";
import { templateDocsManifest } from "appinit-templates/docs";

export async function GET() {
  return NextResponse.json(templateDocsManifest);
}
