import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, content, user_name, profile_image, is_pinned, created_at
      FROM portfolio_comments
      ORDER BY is_pinned DESC, created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/comments error:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content, user_name, profile_image } = await request.json();

    if (!content?.trim() || !user_name?.trim()) {
      return NextResponse.json({ error: "content and user_name are required" }, { status: 400 });
    }

    const sql = getDb();
    const [row] = await sql`
      INSERT INTO portfolio_comments (content, user_name, profile_image, is_pinned)
      VALUES (${content.trim()}, ${user_name.trim()}, ${profile_image ?? null}, false)
      RETURNING id, content, user_name, profile_image, is_pinned, created_at
    `;
    return NextResponse.json(row, { status: 201 });
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
