import { createClient } from '@supabase/supabase-js';

// Correctly assigning the URL and key as strings
const supabaseUrl = 'https://sjhvzzkszbjeunrvgqvw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqaHZ6emtzemJqZXVucnZncXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwOTQ2MDgsImV4cCI6MjA1MjY3MDYwOH0.lkz7qhlQ-rxSlZJzCXgBNDPFnoMjvu9QQWWnSf8zOco';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('supabaseUrl or supabaseKey is missing');
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
