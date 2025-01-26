import { getUser } from "../Utils/core";

const list = async (table_name, supabase, conditions) => {
  let query = supabase.from(table_name).select();

  if (conditions && conditions.length > 0) {
    for (var condition of conditions) {
      query = query.eq(condition.field, condition.value);
    }
  }

  const { data, error } = await query
    .eq("user_id", getUser().id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

const save = async (table_name, supabase, item) => {
  return await update(table_name, supabase, null, item);
};

const get = async (table_name, supabase, conditions) => {
  return (await list(table_name, supabase, conditions))[0];
};

const remove = async (table_name, supabase, id) => {
  return await supabase.from(table_name).delete().eq("id", id);
};

const update = async (table_name, supabase, id, item) => {
  if (id) {
    item.id = id;
  }

  item.user_id = getUser().id;

  return await supabase.from(table_name).upsert(item).select();
};

export { list, save, get, remove, update };
