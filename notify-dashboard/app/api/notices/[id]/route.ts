import { NextRequest, NextResponse } from "next/server";
import {
  deleteNotice,
  isAuthorizedAdmin,
  updateNotice,
  type NoticeInput
} from "@/lib/notices";

function getAccessKey(request: NextRequest) {
  return request.headers.get("x-admin-key");
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!isAuthorizedAdmin(getAccessKey(request))) {
    return NextResponse.json({ message: "Unauthorized admin action." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as Partial<NoticeInput>;

  if (!body.title || !body.content || !body.category || !body.audience) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  const notice = await updateNotice(id, {
    title: body.title,
    content: body.content,
    category: body.category,
    audience: body.audience,
    urgent: body.urgent ?? body.category === "Urgent"
  });

  if (!notice) {
    return NextResponse.json({ message: "Notice not found." }, { status: 404 });
  }

  return NextResponse.json({ notice });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!isAuthorizedAdmin(getAccessKey(request))) {
    return NextResponse.json({ message: "Unauthorized admin action." }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteNotice(id);

  if (!deleted) {
    return NextResponse.json({ message: "Notice not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
