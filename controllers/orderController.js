const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync");
const Drug = require("../model/drugModel");
const AppError = require("../utils/AppError");
const Order = require("../model/orderModel");
const factory = require("./handlerFactory");
const User = require("../model/userModel");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const drug = await Drug.findById(req.params.drugId);

  if (!drug) return next(new AppError("No drug Exists with this Id", 400));

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/#/customer/my-orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/#/customer/drugs-detail/${
      req.params.drugId
    }`,
    customer_email: req.user.email,
    client_reference_id: req.params.drugId,
    line_items: [
      {
        name: drug.genericName,
        // // description: drug.description,
        images: [
          "https://firebasestorage.googleapis.com/v0/b/f-clubhouse.appspot.com/o/posts%2Fprogrammer.jpg?alt=media&token=7ae540d9-2566-4097-9bdd-2c1466f95f6a",
        ], //Replace later
        amount: drug.sellingPrice,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    stripeSession,
  });
});

exports.getMyOrderedDrug = catchAsync(async (req, res, next) => {
  // This returns all the orders with this user and not the drugs purchased
  const orders = await Order.find({ user: req.user._id }).lean().exec();

  const drugId = orders.map((el) => el.drug);
  const drugs = await Drug.find({ _id: { $in: drugId } });

  res.status(200).json({
    result: "success",
    drugs,
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  // This returns all the orders with this user and not the drugs purchased
  const orders = await Order.find({ user: req.user._id }).lean().exec();

  res.status(200).json({
    result: "success",
    orders,
  });
});

const createBookingCheckout = async (session) => {
  const drug = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email }))._id;
  const price = session.line_items[0].amount;
  await Order.create({ drug, price, user });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type == "checkout.session.completed") {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ recieved: true });
};

exports.getAllOrders = factory.getAll(Order);
exports.createOrder = factory.createOne(Order);
exports.getOrder = factory.getOne(Order);

exports.deleteOneOrder = factory.deleteOne(Order);
exports.updateOrder = factory.updateOne(Order);
