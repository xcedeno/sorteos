import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mqwoiluxwudfevwdezyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xd29pbHV4d3VkZmV2d2Rlenl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NzI4ODYsImV4cCI6MjA1MjM0ODg4Nn0.f_OmihOFu0UcX47CMZfHafHj_BaD5kCkTVMW-VsqVlQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
