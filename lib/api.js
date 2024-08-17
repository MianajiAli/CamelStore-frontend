// lib/api.js

// Function to fetch categories
export async function fetchCategories() {
    const response = await fetch('http://127.0.0.1:8000/shop/categories/?format=json');
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
}

// Function to fetch products
export async function fetchProducts(id) {
    const response = await fetch(`http://127.0.0.1:8000/shop/products/${id}?format=json`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

// Function to fetch a cart by ID
export async function fetchCart(cartId) {
    const response = await fetch(`http://127.0.0.1:8000/shop/carts/${cartId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch cart');
    }
    return response.json();
}

// Function to add an item to the cart
export async function addItemToCart(cartId = '', productId, quantity = 1) {
    const payload = {
        product: productId,   // Send the product ID directly
        quantity: quantity,   // Send the quantity directly
    };

    console.log('Payload:', payload); // Log payload for debugging

    const response = await fetch(`http://127.0.0.1:8000/shop/carts/${cartId}/items/`, {
        method: 'POST', // Ensure method is POST
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();  // Capture error response for debugging
        console.error('Failed to add item to cart:', errorText);
        throw new Error('Failed to add item to cart');
    }

    return response.json();
}

// Function to update an item in the cart
export async function updateCartItem(cartId, itemId, quantity) {
    const response = await fetch(`http://127.0.0.1:8000/shop/carts/${cartId}/items/${itemId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quantity: quantity,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to update cart item');
    }
    return response.json();
}

// Function to delete an item from the cart
export async function deleteCartItem(cartId, itemId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/shop/carts/${cartId}/items/${itemId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Check for errors and throw if not successful
            const errorData = await response.json();
            console.error('Error details:', errorData);
            throw new Error(`Failed to delete cart item: ${response.status} ${response.statusText}`);
        }

        // No need to parse JSON if the response status is 204 No Content
        if (response.status === 204) {
            return; // Successful deletion, nothing to return
        }

        // If response has content, parse it as JSON
        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;  // Re-throw the error for higher-level handling
    }
}
