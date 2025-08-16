import React from "react";

const ProductPage: React.FC = () => {
  return (
    <div className="bg-color5 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Lado esquerdo */}
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-color4 mb-4">
              <img
                className="w-full h-full object-cover rounded-lg"
                src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                alt="Product Image"
              />
            </div>

            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-color1 text-white py-2 px-4 rounded-full font-bold hover:bg-color2">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-color2 text-white py-2 px-4 rounded-full font-bold hover:bg-color3">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Lado direito */}
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-color1 mb-2">
              Product Name
            </h2>
            <p className="text-sm mb-4 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              ante justo. Integer euismod libero id mauris malesuada tincidunt.
            </p>

            {/* Preço e disponibilidade */}
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-color1">Price:</span>{" "}
                <span className="text-white">$29.99</span>
              </div>
              <div>
                <span className="font-bold text-color1">Availability:</span>{" "}
                <span className="text-white">In Stock</span>
              </div>
            </div>

            {/* Cores */}
            <div className="mb-4">
              <span className="font-bold text-color1">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full mr-2 bg-color1"></button>
                <button className="w-6 h-6 rounded-full mr-2 bg-color2"></button>
                <button className="w-6 h-6 rounded-full mr-2 bg-color3"></button>
                <button className="w-6 h-6 rounded-full mr-2 bg-color4"></button>
              </div>
            </div>

            {/* Tamanhos */}
            <div className="mb-4">
              <span className="font-bold text-color1">Select Size:</span>
              <div className="flex items-center mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="py-2 px-4 rounded-full font-bold mr-2 text-white bg-color3 hover:bg-color2"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <span className="font-bold text-color1">
                Product Description:
              </span>
              <p className="text-sm mt-2 text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis
                dapibus augue vel ipsum pretium, et venenatis sem blandit.
                Quisque ut erat vitae nisi ultrices placerat non eget velit.
                Integer ornare mi sed ipsum lacinia, non sagittis mauris
                blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt
                mi consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
