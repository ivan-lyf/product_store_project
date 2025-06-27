import {create} from 'zustand'

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),


    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return{success: false, message: 'Please fill in all fields.'}
        }
        const res = await fetch(`${BASE_URL}/api/products`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}));
        return{success: true, message: 'Product created.'}
    },


    fetchProducts: async() => {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        set({products: data.data});
    },


    deleteProduct: async (pid) =>{
        const res = await fetch(`${BASE_URL}/api/products${pid}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return{success: false, message: data.message};

        set(state => ({products: state.products.filter(products => products._id !== pid)}));
        return{success: true, message: data.message};
    },


    updateProduct: async(pid, updatedProduct) =>{
        const res = await fetch(`${BASE_URL}/api/products${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) return{success: false, message: data.message};

        set((state) => ({
            products: state.products.map((products) => (products._id === pid ? data.data: product)),
        }));

        return {success: true, message: data.message}
    },
}));