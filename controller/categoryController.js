const Category = require("../Model/CategoryModel");

exports.addCategory = async (req, res) => {
  try {
    const { catgeoryLevel, parentId, description, image, name } = req.body;

    if (!name || !description) {
      throw new Error("Enter required fields");
    }

    const category = await Category.create({
      catgeoryLevel,
      parentId,
      description,
      image,
      name,
    });

    if (!category) throw new Error("Something went wrong");
    const result = {
      message: `${name} category added successFully`,
      category,
    };

    res.status(200).json({ status: "Success", result });
  } catch (err) {}
  res.status(400).json({ status: "Fail", message: `${err.message}` });
};

exports.getCategories = async (req, res) => {
  try {
    const { id } = req.query;
    let catagories;

    if (!id) {
      // need to fetch the parent categories
      catagories = await Category.find({
        categoryLevel: 1,
        parentId: null,
      });
    } else {
      catagories = await Category.find({ parentId: id });
    }
    result = {
      catagories,
      message: "Categories fetched successfully",
      total: catagories?.length,
    };
    res.status(200).json({ status: "Success", result });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `${err.message}` });
  }
};

exports.addAllCategories = async (req, res) => {
  try {
    const mainCategories = [
      {
        name: "Production",
        description: "Activities related to manufacturing and producing goods.",
      },
      {
        name: "Service",
        description: "Activities related to providing services to customers.",
      },
      {
        name: "Shops & Sale",
        description:
          "Activities related to selling goods in retail or wholesale.",
      },
      {
        name: "Agriculture",
        description: "Activities related to farming and livestock.",
      },
      {
        name: "Taxi",
        description: "Activities related to transportation services.",
      },
      {
        name: "Business Training",
        description: "Programs for enhancing business skills and knowledge.",
      },
    ];

    const subCategories = {
      Production: [
        { name: "Food", description: "Production of food items." },
        {
          name: "Electronics",
          description: "Manufacturing of electronic devices.",
        },
        { name: "Furnish", description: "Production of furniture." },
        { name: "Cloth", description: "Textile manufacturing." },
        {
          name: "Plastic Products",
          description: "Manufacturing of plastic goods.",
        },
        {
          name: "Construction Products",
          description: "Production of construction materials.",
        },
        {
          name: "Agricultural Product",
          description: "Production of agricultural goods.",
        },
      ],
      Service: [
        {
          name: "Digital Service",
          description: "Provision of digital and IT services.",
        },
        { name: "Entertainment", description: "Entertainment services." },
        { name: "Sports", description: "Sports-related services." },
        {
          name: "Maintenance",
          description: "Maintenance and repair services.",
        },
        { name: "Education", description: "Educational services." },
      ],
      "Shops & Sale": [
        {
          name: "Supermarket",
          description:
            "Large retail stores selling groceries and household goods.",
        },
        { name: "Hotels", description: "Accommodation services." },
        { name: "Meat & Fish", description: "Shops selling meat and fish." },
        {
          name: "Vegetables & Fruits",
          description: "Shops selling vegetables and fruits.",
        },
        { name: "Jewellery", description: "Shops selling jewellery." },
        {
          name: "Wholesale Shop",
          description: "Stores selling goods in bulk.",
        },
        {
          name: "Stationary & Grocery",
          description: "Shops selling stationary and grocery items.",
        },
        { name: "Cloth", description: "Shops selling clothing." },
        {
          name: "Construction Materials",
          description: "Shops selling construction materials.",
        },
      ],
      Agriculture: [
        {
          name: "Pets, Animals",
          description: "Activities related to pet and livestock farming.",
        },
        {
          name: "Fruits & Vegetables",
          description: "Cultivation of fruits and vegetables.",
        },
      ],
      Taxi: [
        {
          name: "Passenger Service",
          description: "Passenger transportation services.",
        },
        {
          name: "Goods Carrier",
          description: "Goods transportation services.",
        },
      ],
      "Business Training": [
        {
          name: "Govt.",
          description: "Government-provided business training programs.",
        },
        {
          name: "Priv",
          description: "Privately-provided business training programs.",
        },
      ],
    };

    // Create main categories
    for (const mainCategory of mainCategories) {
      const mainCat = new Category({
        name: mainCategory.name,
        description: mainCategory.description,
        categoryLevel: 1,
        parentId: null,
      });

      await mainCat.save();

      // Create subcategories
      if (subCategories[mainCategory.name]) {
        for (const subCategory of subCategories[mainCategory.name]) {
          const subCat = new Category({
            name: subCategory.name,
            description: subCategory.description,
            categoryLevel: 2,
            parentId: mainCat._id,
          });

          await subCat.save();
        }
      }
    }
    res.status(200).json({ status: "Success", meesage: "Categories Added" });
  } catch (err) {
    res.status(400).json({ status: "Success", message: `${err.message}` });
  }
};
