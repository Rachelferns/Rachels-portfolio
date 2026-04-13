import { NextRequest, NextResponse } from "next/server";
import { createNotice, getNotices, isAuthorizedAdmin, type NoticeInput } from "@/lib/notices";

function getAccessKey(request: NextRequest) {
  return request.headers.get("x-admin-key");
}

export async function GET() {
  const notices = await getNotices();
  return NextResponse.json({ notices });
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin(getAccessKey(request))) {
    return NextResponse.json({ message: "Unauthorized admin action." }, { status: 401 });
  }

  const body = (await request.json()) as Partial<NoticeInput>;

  if (!body.title || !body.content || !body.category || !body.audience) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  const notice = await createNotice({
    title: body.title,
    content: body.content,
    category: body.category,
    audience: body.audience,
    urgent: body.urgent ?? body.category === "Urgent"
  });

  return NextResponse.json({ notice }, { status: 201 });
}
