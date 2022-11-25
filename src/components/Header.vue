<template>
  <div>
    <div class="header">
      <img src="@/assets/image/logo.png" alt="Logo" />
      <div class="right">
        <template v-if="!isLogin">
          <button class="btn-signup" @click="openModalSignup()">Đăng ký</button>
          <button class="btn-signin" @click="openModalSignin()">Đăng nhập</button>
         </template>
        <button v-else class="btn-logout" @click="logout" >Đăng xuất</button>
      </div>
    </div>

    <!-- Start modal signup -->
    <vue-bottom-sheet
      ref="signupBottomSheet"
      max-width="600px"
      max-height="85%"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>Đăng ký ngay</h2>
          <img
            src="@/assets/icon/close.svg"
            alt="Icon Close"
            @click="closeModalSignup()"
          />
        </div>
        <div class="modal-container">
          <p>Tên đăng nhập *</p>
          <div class="input-wrap">
            <input
              type="text"
              placeholder="Nhập tên đăng nhập của bạn"
              v-model="usernameSignup"
            />
            <span class="error" v-if="errorValidate.username">
              {{ errorValidate.username }}
            </span>
          </div>
          <p>Số Zalo *</p>
          <div class="input-wrap">
            <input
              type="number"
              placeholder="Nhập số điện thoại đăng kí Zalo"
              v-model="zaloSignup"
            />
            <span class="error" v-if="errorValidate.phone">
              {{ errorValidate.phone }}
            </span>
          </div>
          <p>Mật khẩu *</p>
          <div class="input-wrap">
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Nhập mật khẩu"
              v-model="passwordSignup"
            />
            <span class="password-show" @click="showPassword = !showPassword">
              {{ showPassword ? "Ẩn" : "Hiện" }}
            </span>
            <span class="error" v-if="errorValidate.password">
              {{ errorValidate.password }}
            </span>
          </div>
          <p>Nhập lại mật khẩu *</p>
          <div class="input-wrap">
            <input
              :type="showPasswordConfirm ? 'text' : 'password'"
              placeholder="Nhập lại mật khẩu"
              v-model="passwordConfirmSignup"
            />
            <span
              class="password-show"
              @click="showPasswordConfirm = !showPasswordConfirm"
            >
              {{ showPasswordConfirm ? "Ẩn" : "Hiện" }}
            </span>
            <span class="error" v-if="errorValidate.passwordConfirmation">
              {{ errorValidate.passwordConfirmation }}
            </span>
          </div>
          <p>Ngày tháng năm sinh *</p>
          <div class="input-wrap">
            <input
              type="date"
              placeholder="Nhập ngày tháng năm sinh"
              v-model="birthdaySignup"
            />
            <span class="error" v-if="errorValidate.birthday">
              {{ errorValidate.birthday }}
            </span>
          </div>
          <div class="input-wrap">
           <vue-recaptcha ref="recaptcha" sitekey="6LcpqC4jAAAAADQqAJXI4zRTgiOQZ52SCU9ZhEE8"  @verify="onverifyCaptcha"/>
           <span class="error" v-if="errorValidate.captcha">
              {{ errorValidate.captcha }}
            </span>
          </div>
          <button class="btn" @click="submitSignup()">Đăng ký</button>
        </div>
      </div>
    </vue-bottom-sheet>
    <!-- End modal signup -->

    <!-- Start modal signin -->
    <vue-bottom-sheet
      ref="signinBottomSheet"
      max-width="600px"
      max-height="80%"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>Đăng nhập</h2>
          <img
            src="@/assets/icon/close.svg"
            alt="Icon Close"
            @click="closeModalSignin()"
          />
        </div>
        <div class="modal-container">
          <p>Tên đăng nhập *</p>
          <div class="input-wrap">
            <input
              type="text"
              placeholder="Nhập tên đăng nhập của bạn"
              v-model="usernameSignin"
            />
            <span class="error" v-if="errorValidateSignin.username">
              {{ errorValidateSignin.username }}
            </span>
          </div>
          <p>Mật khẩu *</p>
          <div class="input-wrap">
            <input
              :type="showPasswordSignin ? 'text' : 'password'"
              placeholder="Nhập mật khẩu"
              v-model="passwordSignin"
            />
            <span
              class="password-show"
              @click="showPasswordSignin = !showPasswordSignin"
            >
              {{ showPasswordSignin ? "Ẩn" : "Hiện" }}
            </span>
            <span class="error" v-if="errorValidateSignin.password">
              {{ errorValidateSignin.password }}
            </span>
          </div>
          <button class="btn" @click="submitSignin()">Đăng nhập</button>
        </div>
      </div>
    </vue-bottom-sheet>
    <!-- End modal signin  -->

    <!-- Start modal success -->
    <modal
      name="my-first-modal"
      classes="custom-modal"
      :width="300"
      :height="350"
      :adaptive="true"
    >
      <div class="modal-wrap">
        <img src="@/assets/icon/checked.svg" alt="Icon Link" />
        <h3>Thành công</h3>
        <p>Chúng tôi sẽ liên lạc lại bạn trong thời gian sớm nhất !</p>
        <button class="btn" @click="hideModalSuccess()">Đồng ý</button>
      </div>
    </modal>
    <!-- End modal success -->
  </div>
</template>

<script>
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import * as yup from "yup";
import API_CLIENT from "@/api";
import { VueRecaptcha } from 'vue-recaptcha';

const defaultErrorSignup = {
  username: null,
  phone: null,
  password: null,
  passwordConfirmation: null,
  birthday: null,
  captcha: null,
};
const defaultErrorSignin = {
  username: null,
  password: null,
};
export default {
  name: "HeaderApp",
  components: {
    VueBottomSheet,
    VueRecaptcha
  },
  data: () => ({
    showPassword: false,
    showPasswordConfirm: false,
    showPasswordSignin: false,
    usernameSignup: "",
    zaloSignup: "",
    passwordSignup: "",
    passwordConfirmSignup: "",
    birthdaySignup: "",
    usernameSignin: "",
    passwordSignin: "",
    errorValidate: { ...defaultErrorSignup },
    errorValidateSignin: { ...defaultErrorSignin },
    isLogin: false,
    isVerify: false,
  }),

  created(){
    this.isLogin = !!localStorage.getItem('token');
  },
  mounted() {},
  methods: {
    onverifyCaptcha(){
      this.isVerify = true;
    },

    logout(){
      localStorage.removeItem('token');
      this.isLogin = false;
    },
    openModalSignup() {
      this.$refs.signupBottomSheet.open();
    },
    closeModalSignup() {
      this.$refs.signupBottomSheet.close();
    },
    openModalSignin() {
      this.$refs.signinBottomSheet.open();
    },
    closeModalSignin() {
      this.$refs.signinBottomSheet.close();
    },
    hideModalSuccess() {
      this.$modal.hide("my-first-modal");
    },

    submitSignup() {
      const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
      const validateSchema = yup.object().shape({
        username: yup.string().required("Vui lòng nhập lại tên đăng nhập"),
        phone: yup
          .string()
          .required("Vui lòng nhập lại số Zalo")
          .matches(phoneRegExp, "Vui lòng nhập lại số Zalo"),
        password: yup
          .string()
          .required("Vui lòng nhập lại mật khẩu")
          .min(8, "Mật khẩu quá ngắn. Ít nhất từ 8 ký tự."),
        passwordConfirmation: yup
          .string()
          .oneOf([yup.ref("password"), null], "Mật khẩu nhập lại không đúng"),
        birthday: yup.string().required("Ngày sinh không đúng"),
        captcha: yup.boolean().oneOf([true], 'Vui lòng xác minh ReCAPTCHA')
      });
      validateSchema
        .validate(
          {
            username: this.usernameSignup,
            phone: this.zaloSignup,
            password: this.passwordSignup,
            passwordConfirmation: this.passwordConfirmSignup,
            birthday: this.birthdaySignup,
            captcha: this.isVerify
          },
          { abortEarly: false }
        )
        .then(() => {
          this.errorValidate = { ...defaultErrorSignup };
          API_CLIENT.post("/api/user/create", {
            username: this.usernameSignup,
            zalo: this.zaloSignup,
            password: this.passwordSignup,
            birthday: Date.parse(this.birthdaySignup),
          })
            .then((response) => {
              if (response?.data?.success === 1) {
                this.$refs.signupBottomSheet.close();
                this.$modal.show("my-first-modal");
                this.usernameSignup = "";
                this.zaloSignup = "";
                this.passwordSignup = "";
                this.passwordConfirmSignup = "";
                this.birthdaySignup = "";
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          this.errorValidate = { ...defaultErrorSignup };
          err.inner.forEach((error) => {
            if (error?.path) {
              this.errorValidate[error?.path] = error.errors[0];
            }
          });
        });
    },
    submitSignin() {
      const validateSchema = yup.object().shape({
        username: yup.string().required("Vui lòng nhập lại tên đăng nhập"),
        password: yup
          .string()
          .required("Vui lòng nhập lại mật khẩu")
          .min(8, "Mật khẩu quá ngắn. Ít nhất từ 8 ký tự."),
      });
      validateSchema
        .validate(
          {
            username: this.usernameSignin,
            password: this.passwordSignin,
          },
          { abortEarly: false }
        )
        .then(() => {
          this.errorValidateSignin = { ...defaultErrorSignin };
          API_CLIENT.post("/api/user/login", {
            username: this.usernameSignin,
            password: this.passwordSignin,
          })
            .then((response) => {
              if (response.data.data.token) {
                this.isLogin = true;
                this.$refs.signinBottomSheet.close();
                localStorage.setItem("token", response.data.data.token);
              }
            })
            .catch(() => {
              this.errorValidateSignin.username =
                "Sai tên đăng nhập hoặc mật khẩu";
              this.errorValidateSignin.password =
                "Sai tên đăng nhập hoặc mật khẩu";
            });
        })
        .catch((err) => {
          this.errorValidateSignin = { ...defaultErrorSignin };
          err.inner.forEach((error) => {
            if (error?.path) {
              this.errorValidateSignin[error?.path] = error.errors[0];
            }
          });
        });
    },
  },
};
</script>

<style lang="scss">
.custom-modal {
  border-radius: 8px;
  .modal-wrap {
    text-align: center;
    padding-top: 50px;
    width: 250px;
    margin: 0 auto;
    h3 {
      font-size: 1.5rem;
      margin: 30px 0 12px;
    }
    p {
      color: #5e5e5e;
      font-size: 0.875rem;
      margin: 0;
      margin-bottom: 20px;
    }
  }
  .btn {
    width: 100%;
    background-color: #4E46B4;
    border: 0;
    color: #fff;
    border-radius: 8px;
    padding: 14px;
    cursor: pointer;
    font-size: 1rem;
  }
}
.bottom-sheet__content {
  overflow-y: auto !important;
  margin-bottom: 10px;
  /* Start scroll bar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(196, 196, 196);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  /* End scroll bar */
}

/* Start hidden input number array */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
/* End hidden input number array */
</style>

<style lang="scss" scoped>
.header {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  img {
    max-width: 70px;
  }

  .right {
    .btn-signup,
    .btn-signin,
    .btn-logout {
      border: none;
      color: #50ABFF;
      padding: 12px;
      font-size: 0.75rem;
      background-color: #50ABFF;
      border-radius: 8px;
      margin: 0 6px;
      cursor: pointer;
    }

    .btn-signin {
      color: #5FD866;
      background-color: rgba(95, 216, 102, 0.1);
    }
    .btn-logout {
       color: #FF6D6C;
       background: rgba(#FF6D6C, 0.3);
    }
  }
}

.modal-content {
  .modal-header {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1.2px solid #EBEBEB;
    h2 {
      font-size: 1.3rem;
      font-weight: 590;
      margin-bottom: 20px;
    }
    img {
      cursor: pointer;
    }
  }
  .modal-container {
    padding: 25px 30px;
    position: relative;
    p {
      margin: 0;
    }
    .input-wrap {
      margin: 8px 0 20px;
      position: relative;

      input {
        width: 100%;
        font-size: 0.875rem;
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid #EBEBEB;
      }
      .error {
        display: block;
        font-size: 0.8rem;
        padding-top: 2px;
        color: red;

        position: absolute;
      }
    }
    .password-show {
      position: absolute;
      right: 46px;
      margin-top: 12px;
      font-size: 0.875rem;
      text-decoration-line: underline;
      cursor: pointer;
    }
    .btn {
      width: 100%;
      background-color: #4E46B4;
      border: 0;
      color: #fff;
      border-radius: 8px;
      padding: 14px;
      margin-top: 20px;
      cursor: pointer;
      font-size: 1rem;
    }
  }
}
</style>
