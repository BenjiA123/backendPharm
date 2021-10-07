const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync");
const Drug = require("../model/drugModel");
const AppError = require("../utils/AppError");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const drug = await Drug.findById(req.params.drugId);

  if (!drug) return next(new AppError("No drug Exists with this Id", 400));

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/#/customer/${
      req.user._id
    }/bookings`,
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
