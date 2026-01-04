const { prisma } = require('../config/db.js');

const getCart = async (req, res) => {
    try {
    const userId = req.user?.id

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: true }
      })
    }

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    )

    res.json({ cart, totalPrice })
  } catch (err) {
    res.status(500).json({ error: "cart loading error" })
  }
}    

const addToCart = async (req, res) => {
    try {
    const { productId, quantity } = req.body
    const userId = req.user?.id

    let cart = await prisma.cart.findUnique({
      where: { userId }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      })
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({ error: "product does not exists" })
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId
      }
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.price
        }
      })
    }

    res.json({ message: "product added to cart" })
  } catch (err) {
    res.status(500).json({ error: "failed to add to cart" })
  }
}

const updateCartItem = async (req,res) => {
    try {
    const { id } = req.params
    const { quantity } = req.body

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id } })
      return res.json({ message: "Produkt usunięty" })
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity }
    })

    res.json({ message: "Zaktualizowano ilość" })
  } catch (err) {
    res.status(500).json({ error: "Błąd aktualizacji koszyka" })
  }
}

const removeCartItem = async (req, res) => {
    try {
    const { id } = req.params

    await prisma.cartItem.delete({
      where: { id }
    })

    res.json({ message: "Usunięto produkt z koszyka" })
  } catch (err) {
    res.status(500).json({ error: "Błąd usuwania produktu" })
  }
}

const clearCart = async (req, res) => {
    try {
    const userId = req.user?.id

    const cart = await prisma.cart.findUnique({
      where: { userId }
    })

    if (!cart) {
      return res.json({ message: "Koszyk już pusty" })
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    })

    res.json({ message: "Koszyk wyczyszczony" })
  } catch (err) {
    res.status(500).json({ error: "Błąd czyszczenia koszyka" })
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };