const { SELECT_BASEITEM } = require("../configs/baseitem.config");
const { NotFoundRequestError } = require("../core/responses/error.response");
const baseItemModel = require("../models/baseItem.model");
const inputDetailModel = require("../models/inputDetail.model");
const itemModel = require("../models/item.model");

const getAvgInputPriceOfBaseItem = async ({ id }) => {
  const baseItemHolder = await baseItemModel
    .findOne({ _id: id, isDeleted: false })
    .lean();
  if (!baseItemHolder) throw new NotFoundRequestError("Not found base item");

  const itemHolders = await itemModel
    .find({
      baseItemId: id,
      isDeleted: false,
    })
    .lean();

  const inputDetailHolders = await inputDetailModel.find({
    itemId: { $in: itemHolders.map((item) => item._id) },
    isDeleted: false,
  });

  let avgPrice = 0,
    count = 0;
  for (let inputDetail of inputDetailHolders) {
    count++;
    avgPrice += inputDetail.inputPrice;
  }
  avgPrice /= count;
  return avgPrice;
};

const getAllBaseItem = async ({
  limit,
  sort,
  page,
  filter,
  select,
  expand,
}) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };

  const populateOptions = {
    BaseItems: {
      select: SELECT_BASEITEM.DEFAULT,
    },
  };

  const populateFields = expand
    ? expand
        .split(" ")
        .map((field) => populateOptions[field])
        .filter(Boolean)
    : [];
  const excludeFields = "-isDeleted -createdAt -updatedAt -__v";

  let baseItems = await baseItemModel
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(`${select} ${excludeFields}`)
    .populate(populateFields)
    .lean();

  // for (let baseItem of baseItems) {
  //   baseItem.avgInputPrice = await getAvgInputPriceOfBaseItem({
  //     id: baseItem._id,
  //   });
  // }
  // console.log(baseItems);

  const totalBaseItems = await baseItemModel.countDocuments(filter);
  const totalPages = Math.ceil(totalBaseItems / limit);

  return {
    baseItems,
    page: Number(page),
    totalPages: totalPages,
    limit: limit,
  };
};
module.exports = { getAllBaseItem, getAvgInputPriceOfBaseItem };
