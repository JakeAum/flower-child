import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function UserManagement() {
  const supabase = createServerComponentClient({ cookies });

  // Fetch all users
  const { data: users, error } = await supabase.from('profiles').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return <div>Error loading users</div>;
  }

  // Server action to toggle user active status
  async function toggleUserActive(userId: string, currentStatus: boolean) {
    'use server';
    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: !currentStatus })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user:', error);
    }
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-item flex justify-between items-center p-2 border-b">
          <span>{user.email}</span>
          <form action={toggleUserActive.bind(null, user.id, user.is_active)}>
            <button 
              type="submit"
              className={`px-3 py-1 rounded ${user.is_active ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {user.is_active ? 'Active' : 'Inactive'}
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}