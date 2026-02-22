import { createClient } from '@/utils/supabase/server'

export default async function Page() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('tags')
        .select('*')

    return (
        <pre>
      {JSON.stringify({ data, error }, null, 2)}
    </pre>
    )
}