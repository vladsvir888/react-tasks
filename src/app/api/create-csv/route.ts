import { NextResponse } from 'next/server';
import { CharacterSummaryWithChecked } from '../../../types';

export async function POST(req: Request) {
  const res: CharacterSummaryWithChecked[] = await req.json();
  const headers = ['id', 'name', 'description', 'url'].join(';');
  const rows = res.map((item) =>
    [item.id, item.name, item.description, item.url].join(';')
  );
  const csvString = [headers, ...rows].join('\r\n');
  return new NextResponse(csvString, {
    status: 200,
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}
