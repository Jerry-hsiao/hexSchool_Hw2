<template>
  <div class="app">
    <div class="container">
      <div class="row py-3">
        <div class="col-md-6">
          <h2>產品列表</h2>
          <table class="table table-hover mt-4">
            <caption>
              目前有
              {{
                products.length
              }}
              項產品
            </caption>
            <thead>
              <tr>
                <th scope="col">產品名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col">查看細節</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="index">
                <td>{{ item.title }}</td>
                <td>{{ item.origin_price }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else>停用</span>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="tempProduct = item"
                  >
                    查看細節
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <h2>單一產品細節</h2>
          <div v-if="tempProduct.title">
            <div class="card mb-4">
              <img
                class="card-img-top primary-image"
                :src="tempProduct.imageUrl"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-text">
                  {{ tempProduct.name }}
                  <span class="badge bg-primary ms-2"
                    >{{ tempProduct.category }}
                  </span>
                </h5>

                <p class="card-text">
                  商品描述 :
                  {{ tempProduct.description }}
                </p>
                <p class="card-text">
                  商品內容 :
                  {{ tempProduct.content }}
                </p>
                <p class="card-text">
                  {{ tempProduct.price }}
                  <del>{{ tempProduct.origin_price }}</del>
                  個 / 元
                </p>
              </div>
            </div>
            <span v-for="(item, index) in tempProduct.imagesUrl" :key="index">
              <img :src="item" alt="" class="images m-2" style="float: left" />
            </span>
          </div>
          <p v-else>請選擇一個商品查看</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2", // 請加入站點
      path: "hexschooljerry", // 請加入個人 API Path
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkLogin() {
      // #3 取得 Token（Token 僅需要設定一次）
      /* eslint-disable */
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.axios.defaults.headers.common["Authorization"] = token;

      // #4  確認是否登入
      this.axios
        .post(`${this.url}/api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    getProducts() {
      this.axios
        .get(`${this.url}/api/${this.path}/admin/products/all`)
        .then((res) => {
          this.products.push(res.data.products["-MtwWwEtVcRnJ_mfFtp7"]);
          this.products.push(res.data.products["-MtwXEwJPco58viojmd6"]);
          this.products.push(res.data.products["-MtwXT78Xbxr9_QqJDgR"]);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
  mounted() {
    this.checkLogin();
    this.getProducts();
  },
};
</script>

<style scoped>
h2,
h5,
table,
p {
  text-align: left;
}

img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
