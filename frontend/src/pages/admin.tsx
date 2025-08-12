import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Admin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.get('http://localhost:3001/api/menu', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMenuItems(res.data))
      .catch(err => router.push('/login'));
  }, []);

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:3001/api/menu', newItem, { headers: { Authorization: `Bearer ${token}` } });
    setMenuItems([...menuItems, res.data]);
    setNewItem({ name: '', description: '', price: 0 });
  };

  const handleUpdate = async (id: number) => {
    const token = localStorage.getItem('token');
    const res = await axios.put(`http://localhost:3001/api/menu/${id}`, newItem, { headers: { Authorization: `Bearer ${token}` } });
    setMenuItems(menuItems.map(item => (item.id === id ? res.data : item)));
    setEditingId(null);
    setNewItem({ name: '', description: '', price: 0 });
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3001/api/menu/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setNewItem({ name: item.name, description: item.description, price: item.price });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin - Manage Menu Items</h1>
      <div className="space-y-4 mb-8">
        <input
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 rounded text-black"
        />
        <input
          value={newItem.description}
          onChange={e => setNewItem({ ...newItem, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 rounded text-black"
        />
        <input
          value={newItem.price}
          onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
          placeholder="Price"
          type="number"
          className="w-full p-2 rounded text-black"
        />
        <button
          onClick={editingId ? () => handleUpdate(editingId) : handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Update' : 'Add'} Item
        </button>
      </div>
      <ul className="space-y-4">
        {menuItems.map(item => (
          <li key={item.id} className="flex justify-between p-4 bg-white rounded shadow">
            <span>{item.name} - ${item.price}</span>
            <div>
              <button onClick={() => startEdit(item)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}