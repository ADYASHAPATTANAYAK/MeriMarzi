const User = require('./models/User');
const Product = require('./models/Product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cart = require('./models/Cart');

const resolvers = {
  Query: {
    products: async () => {
      try {
        return await Product.find();
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
    product: async (_, { id }) => {
      try {
        return await Product.findById(id);
      } catch (error) {
        throw new Error('Product not found');
      }
    },
    cart: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      try {
        let cart = await Cart.findOne({ user: user.userId }).populate('items.product');
        if (!cart) {
          cart = await Cart.create({ user: user.userId, items: [], total: 0 });
        }
        return cart;
      } catch (error) {
        throw new Error('Error fetching cart');
      }
    }
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          username,
          email,
          password: hashedPassword
        });

        const result = await user.save();
        const token = jwt.sign(
          { userId: result.id, email: result.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return {
          id: result.id,
          username: result.username,
          email: result.email,
          token
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          token
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addToCart: async (_, { productId, quantity }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      try {
        let cart = await Cart.findOne({ user: user.userId });
        if (!cart) {
          cart = await Cart.create({ user: user.userId, items: [], total: 0 });
        }

        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');

        const existingItem = cart.items.find(item => 
          item.product.toString() === productId
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity });
        }

        // Recalculate total
        cart.total = await calculateCartTotal(cart.items);
        await cart.save();
        
        return cart.populate('items.product');
      } catch (error) {
        throw new Error('Error adding to cart');
      }
    },
    removeFromCart: async (_, { productId }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      try {
        const cart = await Cart.findOne({ user: user.userId });
        if (!cart) throw new Error('Cart not found');

        cart.items = cart.items.filter(item => 
          item.product.toString() !== productId
        );

        cart.total = await calculateCartTotal(cart.items);
        await cart.save();
        
        return cart.populate('items.product');
      } catch (error) {
        throw new Error('Error removing from cart');
      }
    }
  }
};

// Helper function to calculate cart total
async function calculateCartTotal(items) {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    total += product.price * item.quantity;
  }
  return total;
}

module.exports = resolvers; 