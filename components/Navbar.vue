<template>
    <div class="navbar">
        <!-- <div class="one-column"> -->
        <title>Ert Notes</title>
        <span class="side-bar-icon" v-if="single==undefined" @click="sideBarButtonClick">
            <client-only>
            <font-awesome-icon :icon="['fa', 'bars']" size="lg" />
            </client-only>
        </span>
        <div class="one-column navbar-main" :class="{'use-single': single==undefined}">
            <div class="navbar-brand">
                <a href="/" class="navbar-item navbar-link">ERT Notes</a>
            </div>
            <div class="navbar-menu">
                <span v-if="!userState.isLogin && single==undefined" class="navbar-item navbar-login" @click="login">{{ $t('view.login') }}</span>
                <span v-if="!userState.isLogin && single==undefined" class="navbar-item navbar-login navbar-last" @click="register">{{ $t('view.register') }}</span>
                <span v-if="userState.isLogin && single==undefined" class="navbar-item">{{ userState.username }}{{ userState.readonly?'[' + $t('view.readonly') + ']':'' }}</span>
                <span v-if="userState.isLogin && single==undefined" class="navbar-item navbar-login navbar-last" @click="logout">{{ $t('view.logout') }}</span>
                <div>
                    <select class="select-language" v-model="locale">
                        <option value="cn">中文</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>
        </div>

        <Modal v-if="registerShow" @modalDone="registerDone" @modalClose="registerShow=false">
            <ModalMsg :options="{ type: 'default', content: $t('register.username')+':' }"></ModalMsg>
            <ModalInput :options="{ type: 'text', placeholder: '' }" v-model:inputContent="usernameInput"></ModalInput>
            <ModalMsg :options="{ type: registerOptionExtra.usernameMsg.type, content: $t('register.usernameExist') }" v-if="registerOptionExtra.usernameMsgShow"></ModalMsg>
            <ModalMsg :options="{ type: 'default', content: $t('register.password')+':' }"></ModalMsg>
            <ModalInput :options="{ type: 'password', placeholder: '' }" v-model:inputContent="passwordInput"></ModalInput>
            <ModalMsg :options="{ type: registerOptionExtra.passwordMsg.type, content: $t('register.passwordInvalid') }" v-if="registerOptionExtra.passwordMsgShow"></ModalMsg>
        </Modal>

        <Modal v-if="loginShow" @modalDone="loginDone" @modalClose="loginShow=false">
            <ModalMsg :options="{ type: 'default', content: $t('login.username')+':' }"></ModalMsg>
            <ModalInput :options="{ type: 'text', content: '' }" v-model:inputContent="usernameInput"></ModalInput>
            <ModalMsg :options="{ type: loginOptionExtra.usernameMsg.type, content: $t('login.userNotExist') }" v-if="loginOptionExtra.usernameMsgShow"></ModalMsg>
            <ModalMsg v-if="!readonly" :options="{ type: 'default', content: $t('login.password')+':' }"></ModalMsg>
            <ModalInput v-if="!readonly" :options="{ type: 'password', placeholder: '' }" v-model:inputContent="passwordInput"></ModalInput>
            <ModalMsg :options="{ type: loginOptionExtra.passwordMsg.type, content: $t('login.passwordIncorrect') }" v-if="loginOptionExtra.passwordMsgShow"></ModalMsg>
            <ModalCheckbox :options="{ content: $t('login.readonly') }" v-model:checked="readonly"></ModalCheckbox>
        </Modal>
    </div>
    
</template>

<style>
    .select-language {
        border: 1px solid #1C1C1C;
        height: 100%;
        cursor: pointer;
        width: 80px;
        margin-right: 0.75rem;
    }
    @media(min-width: 1754px) {
        .one-column.navbar-main.use-single {
            position: relative;
            right: 20px;
        }
    }
    .side-bar-icon {
        margin-left: 1rem;
        width: 16.33px;
        cursor: pointer;
    }
    .side-bar-icon:hover {
        color: #06C;
    }
    .navbar-login {
        cursor: pointer;
    }
    .navbar-last {
        margin-right: 1rem;
    }
    .navbar-login:hover {
        color: #06C;
    }
    .one-column {
        width: 100%;
        max-width: 1696px;
        margin: 0 auto;
        padding: 0;
    }
    .navbar {
        background-color: #363636;
        display: flex;
        align-items: center;
    }
    .navbar-main {
        display: flex;
    }
    .navbar-brand {
        display: flex;
    }
    .navbar-menu {
        display: flex;
        justify-content: flex-end;
        flex-grow: 1;
        flex-shrink: 0;
    }
    .navbar-item {
        padding: 0.5rem 0.75rem;
        color: #FFF;
        line-height: 2;
        font-weight: 600;
    }
    .navbar-link {
        text-decoration: none;
    }
    .navbar-link:hover {
        background: #292929;
    }
</style>

<script setup>
    import { useI18n } from 'vue-i18n'
    const { locale } = useI18n({useScope: 'global'});

    const { $showToast } = useNuxtApp();
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faBars } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { md5 } from '~/lib/md5.js';
    import config from '~/config/config.js'
    import axios from 'axios';

    library.add(faBars);

    let userinfo = ref([]);

    const single = useSingle();
    const currentPlayerList = useCurrentPlayerList();
    const editorJson = useEditorJson();
    if (single.value != undefined) {
        currentPlayerList.value = JSON.parse(JSON.stringify(single.value.players));
        editorJson.value = single.value.content;
    }
    else {
        currentPlayerList.value = [];
        editorJson.value = {"type":"doc","content":[{"type":"paragraph"}]};
    }

    //**************************************
    const userState = useState('login', () => ({}));
    userState.value = {
        username: '',
        isLogin: false,
        readonly: false,
        defaultPlayers: [],
    }
    const isSidebarShow = useState('sidebarShow', () => ({}));
    const noteArray = useState('noteArray', () => ({}));
    //**************************************

    isSidebarShow.value = false;
    const logout = () => {
        userState.value.isLogin = false;
        isSidebarShow.value = false;
        currentPlayerList.value = [];
        editorJson.value = {"type":"doc","content":[{"type":"paragraph"}]};
    }


    let usernameInput = ref('');
    let passwordInput = ref('');
    let readonly = ref(false);
    let locked = false;

    let loginShow = ref(false);
    const loginOptionExtra = ref({
        usernameMsgShow: false,
        usernameMsg: {
            type: 'warning',
        },
        passwordMsgShow: false,
        passwordMsg: {
            type: 'warning',
        }
    });
    const login = () => {
        loginOptionExtra.value.usernameMsgShow = false;
        loginOptionExtra.value.passwordMsgShow = false;
        usernameInput.value = '';
        passwordInput.value = '';
        loginShow.value = true;
    }

    const loginDone = () => {
        if (locked) return;
        loginOptionExtra.value.usernameMsgShow = false;
        loginOptionExtra.value.passwordMsgShow = false;
        locked = true;
        axios.post(`${config.baseurl}/server/login`, {
                username: usernameInput.value,
                passwordHash: md5(passwordInput.value),
                readonly: readonly.value,
            }, {
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then( response => {
                locked = false;
                if (response.data.code == '401') {
                    loginOptionExtra.value.usernameMsgShow = true;
                }
                else if (response.data.code == '402') {
                    loginOptionExtra.value.passwordMsgShow = true;
                }
                else if (response.data.code == '200') {
                    userState.value.isLogin = true;
                    userState.value.username = response.data.username;
                    userState.value.readonly = response.data.readonly;
                    userState.value.defaultPlayers = JSON.parse(JSON.stringify(response.data.defaultPlayers));
                    noteArray.value = JSON.parse(JSON.stringify(response.data.noteArray));
                    $showToast('Login successfully!', 'success', 3000);
                    loginShow.value = false;
                    sideBarButtonClick();
                }
            }).catch( error => {
                console.log(error);
            });
    }



    let registerShow = ref(false);
    const registerOptionExtra = ref({
        usernameMsgShow: false,
        usernameMsg: {
            type: 'warning',
        },
        passwordMsgShow: false,
        passwordMsg: {
            type: 'warning',
        }
    });

    const register = () => {
        registerOptionExtra.value.usernameMsgShow = false;
        registerOptionExtra.value.passwordMsgShow = false;
        usernameInput.value = '';
        passwordInput.value = '';
        registerShow.value = true;
    }

    const registerDone = () => {
        if (locked) return;
        registerOptionExtra.value.usernameMsgShow = false;
        registerOptionExtra.value.passwordMsgShow = false;
        if (passwordInput.value.length<=0 || passwordInput.value.length >= 100) {
            registerOptionExtra.value.passwordMsgShow = true;
            return;
        }
        locked = true;
        axios.post(`${config.baseurl}/server/register`, {
                username: usernameInput.value,
                passwordHash: md5(passwordInput.value),
            }, {
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then( response => {
                locked = false;
                if (response.data.code == '200') {
                    $showToast('Register Successfully!', 'success', 3000);
                    registerShow.value = false;
                }
                else if (response.data.code == '400') {
                    registerOptionExtra.value.usernameMsgShow = 'true';
                }
            }).catch( error => {
                console.log(error);
            });
    }

    const sideBarButtonClick = () => {
        if (userState.value.isLogin == false) {
            $showToast('Please login first', 'error', 3000);
            return;
        }
        isSidebarShow.value = !isSidebarShow.value;
    }
</script>