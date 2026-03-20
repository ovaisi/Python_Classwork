import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/revalidate
 *
 * Called by Strapi's revalidate-nextjs middleware whenever content
 * is published or updated. Triggers Next.js ISR on-demand revalidation.
 *
 * Body: { path?: string, tag?: string, secret: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, tag, secret } = body;

    // Validate the shared secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid revalidation secret' },
        { status: 401 }
      );
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, type: 'tag', tag });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, type: 'path', path });
    }

    return NextResponse.json(
      { error: 'Provide either path or tag' },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Revalidation failed', detail: String(err) },
      { status: 500 }
    );
  }
}
