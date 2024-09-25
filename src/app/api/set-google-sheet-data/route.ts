import { setGoogleSheetData } from '@/utils/googleSheets/googleSheets';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    
    const { keyMass } = await req.json();
    const result = await setGoogleSheetData(keyMass);
    return NextResponse.json({ success: true, status: result });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};