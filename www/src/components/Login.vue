<template>
    <div class="login container-fluid">
        <h5 class="text-danger" v-if="error">
            <b>Incorrect e-mail or password. Please try again.</b>
        </h5>
        <div class="row above"></div>
        <div class="row alpha">
            <div class="login-box thumbnail col-sm-4 col-sm-offset-4">
                <h1>proBoards</h1>
                <p>Where your group projects begin. Please login to continue:</p>
                <!-- Add error message if login fails -->
                <div class="form-box row">
                    <div class="form-col col-sm-8 col-sm-offset-2">



                        <div v-if="loginForm" class="login">
                            <form class="form" @submit.prevent="submitLogin">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" type="email" name="email" placeholder="your@email.com" v-model='login.email' required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input class="form-control" type="password" name="password" v-model='login.password' required>
                                </div>
                                <div class="form-group">
                                    <button type="submit">Login</button>
                                </div>
                            </form>
                        </div>

                        <div v-else class="register">
                            <form class="form" @submit.prevent="submitRegister">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input class="form-control" type="text" name="name" placeholder="Name" v-model='register.name' required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" type="email" name="email" placeholder="your@email.com" v-model='register.email' required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input class="form-control" type="password" name="password" v-model='register.password' required>
                                </div>
                                <div class="form-group">
                                    <button type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <p v-if="loginForm" @click="toggleLoginForm" class="action">Not a user? Click here to register</p>
                <p v-else @click="toggleLoginForm" class="action">Already a user? Click here to login</p>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: true,
                login: {
                    email: '',
                    password: ''
                },
                register: {
                    name: '',
                    email: '',
                    password: '',

                }
            }
        },
        methods: {
            toggleLoginForm() {
                this.loginForm = !this.loginForm
            },
            submitLogin() {
                this.$store.dispatch('submitLogin', this.login)
                this.login = {
                    email: '',
                    password: ''
                }
            },
            submitRegister() {
                this.$store.dispatch('submitRegister', this.register)
                this.register = {
                    name: '',
                    email: '',
                    password: '',

                }
            }
        },
        computed: {
            error() {
                return this.$store.state.error.message
            }
        }
    }


</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Julius+Sans+One|Lekton|Overpass+Mono|Rock+Salt|Ubuntu+Mono');
    .action {
        cursor: pointer;
        opacity: .7;
        transition: all .3s linear;
    }

    .above {
        min-height: 5vh;
    }

    .container-fluid {
        background-color: #333333;
        min-height: 100vh;
    }

    .action:hover {
        opacity: 1
    }

    .alpha {
        background-color: #80b6e5;
        padding-top: 3%;
    }
    .login-box {
        font-family: 'Overpass Mono', monospace;
    }
    h1{
        font-family: 'Rock Salt', cursive;
    }
</style>