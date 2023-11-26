/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./server/loadEnvironment.js":
/*!***********************************!*\
  !*** ./server/loadEnvironment.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_0___default().config({\n  path: path__WEBPACK_IMPORTED_MODULE_1___default().resolve(\"./server/.env\")\n});\n\n//# sourceURL=webpack://lobster-bisque-v2/./server/loadEnvironment.js?");

/***/ }),

/***/ "./server/routes/account.js":
/*!**********************************!*\
  !*** ./server/routes/account.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _schemas_AccountModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schemas/AccountModel.js */ \"./server/schemas/AccountModel.js\");\n/* harmony import */ var _schemas_PostModel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schemas/PostModel.js */ \"./server/schemas/PostModel.js\");\n/* harmony import */ var _schemas_CommentModel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../schemas/CommentModel.js */ \"./server/schemas/CommentModel.js\");\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.post('/login', async (req, res) => {\n  const target = await _schemas_AccountModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n    username: req.body.username,\n    password: req.body.password\n  });\n  if (!target) {\n    res.status(400).json({\n      error: 'Invalid username or password'\n    });\n  } else {\n    const {\n      password,\n      ...account\n    } = target._doc;\n    const result = {\n      ...account,\n      profile: 'data:image/png;base64,' + Buffer.from(account.profile, 'base64').toString('base64')\n    };\n    res.status(200).json({\n      account: result\n    });\n  }\n});\nrouter.post('/signUp', async (req, res) => {\n  try {\n    const account = await _schemas_AccountModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create({\n      name: req.body.name,\n      username: req.body.username,\n      password: req.body.password\n    });\n    const {\n      password,\n      ...result\n    } = account._doc;\n    res.status(200).json({\n      account: result\n    });\n  } catch (e) {\n    res.status(400).json({\n      error: 'Username already taken'\n    });\n  }\n});\nrouter.get('/:_id', async (req, res) => {\n  try {\n    const account = await _schemas_AccountModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n      _id: req.params._id\n    });\n    const response = {\n      name: account.name,\n      profile: 'data:image/png;base64,' + Buffer.from(account.profile, 'base64').toString('base64')\n    };\n    res.status(200).json(response);\n  } catch (e) {\n    res.status(404).json({\n      error: 'error getting account by id'\n    });\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://lobster-bisque-v2/./server/routes/account.js?");

/***/ }),

/***/ "./server/routes/comments.js":
/*!***********************************!*\
  !*** ./server/routes/comments.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _schemas_AccountModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schemas/AccountModel */ \"./server/schemas/AccountModel.js\");\n/* harmony import */ var _schemas_CommentModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schemas/CommentModel */ \"./server/schemas/CommentModel.js\");\n/* harmony import */ var _schemas_PostModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../schemas/PostModel */ \"./server/schemas/PostModel.js\");\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.get('/:_id', async (req, res) => {\n  const comments = await _schemas_CommentModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find({\n    post: req.params._id\n  });\n  const supplementComment = async comment => {\n    const result = await _schemas_AccountModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findById(comment.user);\n    const {\n      password,\n      _id,\n      ...account\n    } = result._doc;\n    return {\n      ...comment._doc,\n      ...{\n        ...account,\n        profile: 'data:image/png;base64,' + Buffer.from(account.profile, 'base64').toString('base64')\n      }\n    };\n  };\n  const result = await Promise.all(comments.map(x => supplementComment(x)));\n  res.status(200).json(result);\n});\nrouter.post('/', async (req, res) => {\n  try {\n    const comment = await _schemas_CommentModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create({\n      post: req.body.post,\n      user: req.body.user,\n      content: req.body.content,\n      date: new Date()\n    });\n    let post = await _schemas_PostModel__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findById(req.body.post);\n    post.comments = [comment._id, ...post.comments];\n    const updatedPost = await post.save();\n    res.status(200).json(comment);\n  } catch (e) {\n    console.log(e);\n    res.status(400).json({});\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://lobster-bisque-v2/./server/routes/comments.js?");

/***/ }),

/***/ "./server/routes/posts.js":
/*!********************************!*\
  !*** ./server/routes/posts.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _schemas_PostModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schemas/PostModel.js */ \"./server/schemas/PostModel.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.get('/:_id', async (req, res) => {\n  let posts;\n  if (req.params._id ?? null !== null) {\n    posts = await _schemas_PostModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find({\n      user: req.params._id\n    });\n    console.log(posts);\n  } else {\n    posts = await _schemas_PostModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find({});\n  }\n  const result = posts.map(x => Object({\n    ...x._doc,\n    image: x._doc.image !== null ? 'data:image/png;base64,' + Buffer.from(x._doc.image, 'base64').toString('base64') : null\n  }));\n  res.status(200).json(result);\n});\nrouter.post('/', async (req, res) => {\n  console.log(req.body.image !== null ? 'image' : 'no Image');\n  const post = await _schemas_PostModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create({\n    user: req.body.user,\n    caption: req.body.caption,\n    image: req.body.image ? Buffer.from(req.body.image.split(',')[1], 'base64') : null,\n    date: new Date()\n  });\n  res.status(200).json(post);\n});\nrouter.post('/update/:_id', async (req, res) => {\n  const accountId = req.body._id;\n  let target = await _schemas_PostModel_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findById(req.params._id);\n  switch (req.body.method) {\n    case 'Like':\n      target.likes = target.likes.includes(accountId) ? target.likes.filter(x => x !== accountId) : [...target.likes, accountId];\n      target.dislikes = target.dislikes.includes(accountId) ? target.dislikes.filter(x => x !== accountId) : target.dislikes;\n      break;\n    case 'Dislike':\n      target.dislikes = target.dislikes.includes(accountId) ? target.dislikes.filter(x => x !== accountId) : [...target.dislikes, accountId];\n      target.likes = target.likes.includes(accountId) ? target.likes.filter(x => x !== accountId) : target.likes;\n      break;\n    case 'Comment':\n      break;\n    default:\n      res.status(400);\n  }\n  await target.save();\n  res.status(200).json({});\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://lobster-bisque-v2/./server/routes/posts.js?");

/***/ }),

/***/ "./server/schemas/AccountModel.js":
/*!****************************************!*\
  !*** ./server/schemas/AccountModel.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst defaultProfile = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==';\nconst schema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  username: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  profile: {\n    type: Buffer,\n    required: false,\n    default: Buffer.from(defaultProfile.split(',')[1], 'base64')\n  },\n  bio: {\n    type: String,\n    required: false,\n    default: 'Edit account to update bio!'\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0__.mongoose.model('Account', schema));\n\n//# sourceURL=webpack://lobster-bisque-v2/./server/schemas/AccountModel.js?");

/***/ }),

/***/ "./server/schemas/CommentModel.js":
/*!****************************************!*\
  !*** ./server/schemas/CommentModel.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CommentShema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n  post: {\n    type: String,\n    required: true\n  },\n  user: {\n    type: String,\n    required: true\n  },\n  content: {\n    type: String,\n    required: true\n  },\n  date: {\n    type: Date,\n    required: true\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Comment', CommentShema));\n\n//# sourceURL=webpack://lobster-bisque-v2/./server/schemas/CommentModel.js?");

/***/ }),

/***/ "./server/schemas/PostModel.js":
/*!*************************************!*\
  !*** ./server/schemas/PostModel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst schema = new mongoose__WEBPACK_IMPORTED_MODULE_1__.Schema({\n  user: {\n    type: mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId,\n    required: true\n  },\n  image: {\n    type: Buffer,\n    default: null\n  },\n  caption: {\n    type: String,\n    default: null\n  },\n  likes: {\n    type: [String],\n    default: []\n  },\n  dislikes: {\n    type: [String],\n    default: []\n  },\n  comments: {\n    type: [String],\n    default: []\n  },\n  date: {\n    type: Date,\n    required: true\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_1___default().model('Post', schema));\n\n//# sourceURL=webpack://lobster-bisque-v2/./server/schemas/PostModel.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom_server_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom/server.js */ \"react-router-dom/server.js\");\n/* harmony import */ var react_router_dom_server_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_server_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _loadEnvironment_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./loadEnvironment.js */ \"./server/loadEnvironment.js\");\n/* harmony import */ var _routes_posts_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/posts.js */ \"./server/routes/posts.js\");\n/* harmony import */ var _routes_account_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/account.js */ \"./server/routes/account.js\");\n/* harmony import */ var _routes_comments_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes/comments.js */ \"./server/routes/comments.js\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _src_App_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../src/App.js */ \"./src/App.js\");\n/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! constants */ \"constants\");\n/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(constants__WEBPACK_IMPORTED_MODULE_13__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst PORT = process.env.port || 4000;\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(cors__WEBPACK_IMPORTED_MODULE_11___default()());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());\napp.use('/api/posts', _routes_posts_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\napp.use('/api/account', _routes_account_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\napp.use('/api/comments', _routes_comments_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](path__WEBPACK_IMPORTED_MODULE_5___default().join(__dirname, '../build')));\napp.get('/*', (req, res) => {\n  const indexFile = path__WEBPACK_IMPORTED_MODULE_5___default().join(__dirname, '../build', 'index.html');\n  const context = {};\n  const app = react_dom_server__WEBPACK_IMPORTED_MODULE_2___default().renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router_dom_server_js__WEBPACK_IMPORTED_MODULE_3__.StaticRouter, {\n    location: req.url,\n    context: context\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_src_App_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"], null)));\n  fs__WEBPACK_IMPORTED_MODULE_4___default().readFile(indexFile, 'utf8', (err, data) => {\n    if (err) {\n      console.log(err);\n      return res.status(500);\n    }\n    return res.send(data.replace('<div id=\"root\"></div>', `<div id=\"root\">${app}</div>`));\n  });\n});\nmongoose__WEBPACK_IMPORTED_MODULE_6___default().connect(process.env.ATLAS_URI).then(() => {\n  app.listen(PORT, () => {\n    console.log(`Server listening on port ${PORT}.`);\n  });\n});\n\n//# sourceURL=webpack://lobster-bisque-v2/./server/server.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-storage-complete */ \"react-storage-complete\");\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_storage_complete__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Login */ \"./src/components/Login.js\");\n/* harmony import */ var _components_Posts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Posts */ \"./src/components/Posts.js\");\n/* harmony import */ var _components_Comments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Comments */ \"./src/components/Comments.js\");\n/* harmony import */ var _components_Account__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Account */ \"./src/components/Account.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\nfunction App() {\n  const [state, setState] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_2__.useSessionStorage)('State', {});\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Login__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      state: state,\n      setState: setState\n    })\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/Posts\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Posts__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      state: state\n    })\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/Comments\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Comments__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      state: state\n    })\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    path: \"/Account\",\n    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Account__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n      state: state,\n      setState: setState\n    })\n  })));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/App.js?");

/***/ }),

/***/ "./src/components/Account.js":
/*!***********************************!*\
  !*** ./src/components/Account.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Account)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/bs */ \"react-icons/bs\");\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_bs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/io5 */ \"react-icons/io5\");\n/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_io5__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Posts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Posts */ \"./src/components/Posts.js\");\n\n\n\n\n\n\nfunction Account({\n  state,\n  setState\n}) {\n  const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();\n  const logout = () => {\n    setState({});\n    navigate('/');\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"table\", {\n    style: {\n      width: '100%'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"tr\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\",\n    onClick: () => navigate('/Posts')\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_bs__WEBPACK_IMPORTED_MODULE_1__.BsArrowLeftSquareFill, {\n    size: 40\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, \"Post's\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"th\", {\n    style: {\n      textAlign: 'right'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_bs__WEBPACK_IMPORTED_MODULE_1__.BsGearFill, {\n    size: 40\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, \"Settin's\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\",\n    onClick: () => logout()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_io5__WEBPACK_IMPORTED_MODULE_2__.IoLogOut, {\n    size: 40\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, \"Logoute\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      textAlign: 'center'\n    },\n    className: \"col-lg-4 mx-auto\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, state.account.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    className: \"rounded\",\n    width: 300,\n    height: 300,\n    src: state.account.profile\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, state.account.bio)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Posts__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    state: state,\n    account: true\n  })));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/Account.js?");

/***/ }),

/***/ "./src/components/AddComment.js":
/*!**************************************!*\
  !*** ./src/components/AddComment.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AddComment)\n/* harmony export */ });\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-storage-complete */ \"react-storage-complete\");\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_storage_complete__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _helpers_ApiUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/ApiUrl */ \"./src/helpers/ApiUrl.js\");\n\n\nfunction AddComment({\n  state,\n  postId,\n  setRender = f => f\n}) {\n  const [add, setAdd] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_0__.useSessionStorage)('CommentAdd', false);\n  const [comment, setComment] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_0__.useSessionStorage)('CommentMessage', '');\n  window.scrollTo({\n    top: 0,\n    behavior: 'instant'\n  });\n  const AddComment = async () => {\n    if (comment !== '') {\n      setComment('');\n      setAdd(false);\n      await fetch(`${_helpers_ApiUrl__WEBPACK_IMPORTED_MODULE_1__[\"default\"]}/api/comments/`, {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          post: postId,\n          user: state.account._id,\n          content: comment\n        })\n      });\n      setRender(true);\n    }\n  };\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"banner col-10 mx-auto\"\n  }, state.account.id !== null && /*#__PURE__*/React.createElement(\"form\", {\n    className: `row rounded add ${add ? 'p-3' : ''}`,\n    style: {\n      marginBlock: '10px'\n    },\n    onSubmit: e => {\n      e.preventDefault();\n      AddComment();\n    }\n  }, !add && /*#__PURE__*/React.createElement(\"button\", {\n    className: \"btn btn-success\",\n    onClick: () => setAdd(true)\n  }, \"Add Commetn\"), add && /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"col-lg-2 mx-auto\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Ad\")), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"p-3\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    className: \"form-label\"\n  }, \"Commetn\"), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"paragraph\",\n    className: \"form-control\",\n    value: comment,\n    onInput: e => setComment(e.target.value)\n  })), /*#__PURE__*/React.createElement(\"table\", {\n    style: {\n      width: '100%'\n    }\n  }, /*#__PURE__*/React.createElement(\"tr\", null, /*#__PURE__*/React.createElement(\"th\", null, /*#__PURE__*/React.createElement(\"button\", {\n    type: \"submit\",\n    className: \"btn btn-success\"\n  }, \"Sumbit\")), /*#__PURE__*/React.createElement(\"th\", {\n    style: {\n      textAlign: 'right'\n    }\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"btn btn-success\",\n    onClick: () => {\n      setAdd(false);\n      setComment('');\n    }\n  }, \"Nevermind\")))))));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/AddComment.js?");

/***/ }),

/***/ "./src/components/AddPost.js":
/*!***********************************!*\
  !*** ./src/components/AddPost.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AddPost)\n/* harmony export */ });\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-storage-complete */ \"react-storage-complete\");\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_storage_complete__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction AddPost({\n  state,\n  addPost = f => f\n}) {\n  const [message, setMessage] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_0__.useSessionStorage)('PostMessage', '');\n  const [image, setImage] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_0__.useSessionStorage)('PostImage', null);\n  const [add, setAdd] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_0__.useSessionStorage)('PostAdd', false);\n  const openPost = () => {\n    window.scrollTo({\n      top: 0,\n      behavior: 'smooth'\n    });\n    setAdd(true);\n  };\n  const buildPost = () => {\n    if (image !== null || message !== '') {\n      addPost({\n        image: image,\n        message: message\n      });\n    }\n    clearForm();\n  };\n  const clearForm = () => {\n    setAdd(false);\n    setImage(null);\n    setMessage('');\n  };\n  const id = state.account?._id ?? null;\n  return /*#__PURE__*/React.createElement(\"div\", {\n    style: {\n      zIndex: 9999\n    },\n    className: \"banner\"\n  }, id !== null && /*#__PURE__*/React.createElement(\"form\", {\n    style: {\n      marginBlock: '10px'\n    },\n    className: `row rounded add ${add ? 'p-3' : ''}`,\n    onSubmit: e => {\n      e.preventDefault();\n      buildPost();\n    }\n  }, !add && /*#__PURE__*/React.createElement(\"button\", {\n    className: \"btn btn-success banner\",\n    onClick: () => openPost()\n  }, \"Add Post\"), add && /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"col-lg-2 mx-auto\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Ad\")), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"p-3\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    className: \"form-label\"\n  }, \"Capiton\"), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"form-control\",\n    type: \"paragraph\",\n    value: message,\n    onInput: e => setMessage(e.target.value)\n  })), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"file\",\n    accept: \"image/*\",\n    className: \"form-control\",\n    onInput: e => setImage(e.target.files[0])\n  })), /*#__PURE__*/React.createElement(\"table\", {\n    style: {\n      width: '100%'\n    }\n  }, /*#__PURE__*/React.createElement(\"tr\", null, /*#__PURE__*/React.createElement(\"th\", null, /*#__PURE__*/React.createElement(\"button\", {\n    type: \"submit\",\n    style: {\n      marginTop: '10px'\n    },\n    className: \"btn btn-success col\"\n  }, \"Sumbit Post\")), /*#__PURE__*/React.createElement(\"th\", {\n    style: {\n      textAlign: 'right'\n    }\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    style: {\n      marginTop: '10px'\n    },\n    className: \"btn btn-success col\",\n    onClick: () => {\n      clearForm();\n    }\n  }, \"Nevermind\")))))));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/AddPost.js?");

/***/ }),

/***/ "./src/components/Comment.js":
/*!***********************************!*\
  !*** ./src/components/Comment.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Comment)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Comment({\n  comment,\n  setComments = f => f\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      marginBottom: '10px'\n    },\n    className: \"contrast rounded p-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col-lg-1 p-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    className: \"rounded\",\n    style: {\n      width: '50px',\n      height: '50px'\n    },\n    src: comment.profile,\n    alt: \"\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h4\", {\n    style: {\n      display: 'flex',\n      justifyContent: 'left',\n      alignItems: 'center'\n    },\n    className: \"col-lg-5\"\n  }, comment.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, comment.content));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/Comment.js?");

/***/ }),

/***/ "./src/components/Comments.js":
/*!************************************!*\
  !*** ./src/components/Comments.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Comments)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _PartialPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PartialPost */ \"./src/components/PartialPost.js\");\n/* harmony import */ var _Comment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Comment */ \"./src/components/Comment.js\");\n/* harmony import */ var _AddComment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AddComment */ \"./src/components/AddComment.js\");\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/bs */ \"react-icons/bs\");\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_bs__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-storage-complete */ \"react-storage-complete\");\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_storage_complete__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _helpers_ApiUrl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/ApiUrl */ \"./src/helpers/ApiUrl.js\");\n\n\n\n\n\n\n\n\nfunction Comments({\n  state\n}) {\n  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useLocation)();\n  const {\n    post\n  } = location.state;\n  const [comments, setComments] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_6__.useSessionStorage)('Comments', []);\n  const [render, setRender] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();\n  const getComments = async () => {\n    const response = await fetch(`${_helpers_ApiUrl__WEBPACK_IMPORTED_MODULE_7__[\"default\"]}/api/comments/${post._id}`);\n    const data = await response.json();\n    setComments(data.sort((a, b) => new Date(b.date) - new Date(a.date)));\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getComments();\n    return () => {\n      setRender(false);\n    };\n  }, [render]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col-lg-6 mx-auto p-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\",\n    onClick: () => navigate(-1)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_bs__WEBPACK_IMPORTED_MODULE_5__.BsArrowLeftSquareFill, {\n    size: 40\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      marginBottom: '10px'\n    },\n    className: \"contrast rounded p-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PartialPost__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    post: post\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      backgroundColor: 'grey'\n    },\n    className: \"rounded\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", {\n    style: {\n      textAlign: 'center'\n    }\n  }, \"Commetn's\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AddComment__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    state: state,\n    postId: post._id,\n    setRender: setRender\n  }), comments.map((comment, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Comment__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    key: i,\n    comment: comment,\n    setComments: setComments\n  })))));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/Comments.js?");

/***/ }),

/***/ "./src/components/Login.js":
/*!*********************************!*\
  !*** ./src/components/Login.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Login)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-storage-complete */ \"react-storage-complete\");\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_storage_complete__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _helpers_ApiUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/ApiUrl */ \"./src/helpers/ApiUrl.js\");\n\n\n\n\n\nfunction Login({\n  state,\n  setState = f => f\n}) {\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();\n\n  // form fields\n  const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n  const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n  const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n\n  //\n  const [signUp, setSignUp] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_2__.useSessionStorage)('signUp', false);\n  const [valid, setValid] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_2__.useSessionStorage)('valid', true);\n  const [invalidMessage, setInvalidMessage] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_2__.useSessionStorage)('invalidMessage', '');\n  const redirect = () => {\n    clearFields();\n    setSignUp(signUp ? false : true);\n    setValid(true);\n  };\n  const clearFields = () => {\n    setUsername('');\n    setPassword('');\n    setName('');\n  };\n  const resetPage = () => {\n    clearFields();\n    setSignUp(false);\n    setValid(true);\n  };\n  const login = async (anonymous = false) => {\n    if (anonymous) {\n      setState({\n        account: {\n          id: null\n        }\n      });\n      resetPage();\n      return navigate('/Posts');\n    }\n    const options = {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        username: username,\n        password: password,\n        name: name\n      })\n    };\n    clearFields();\n    const response = await fetch(`${_helpers_ApiUrl__WEBPACK_IMPORTED_MODULE_3__[\"default\"]}/api/account/${signUp ? 'signUp' : 'login'}`, options);\n    const data = await response.json();\n    if (response.ok) {\n      setState(data);\n      resetPage();\n      navigate('/Posts');\n    } else {\n      setInvalidMessage(data.error);\n      setValid(false);\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row p-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", {\n    className: \"col-lg-6 rounded p-3 mx-auto contrast\",\n    onSubmit: e => {\n      e.preventDefault();\n      login();\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", {\n    style: {\n      textAlign: 'center'\n    }\n  }, signUp ? 'Sign Up' : 'Login'), !valid && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", {\n    className: \"text-danger\"\n  }, invalidMessage), signUp && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    className: \"form-lable\"\n  }, \"Full Name\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"form-control\",\n    type: \"name\",\n    required: true,\n    value: name,\n    onInput: e => setName(e.target.value)\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    className: \"form-label\"\n  }, \"Username\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"form-control\",\n    type: \"username\",\n    required: true,\n    value: username,\n    onInput: e => setUsername(e.target.value)\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    className: \"form-label\"\n  }, \"Password\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"form-control\",\n    type: \"password\",\n    required: true,\n    value: password,\n    onInput: e => setPassword(e.target.value)\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row p-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    type: \"submit\",\n    className: \"col-lg-6 mx-auto btn btn-success\"\n  }, signUp ? 'Sign Up' : 'Sign In')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"table\", {\n    style: {\n      width: '100%'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"tr\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btnLink contrast\",\n    onClick: () => redirect()\n  }, signUp ? 'Already have an account?' : \"Don't have an account?\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"th\", {\n    style: {\n      textAlign: 'right'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btnLink contrast\",\n    onClick: () => login(true)\n  }, \"Browse Anonymously\"))))));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/Login.js?");

/***/ }),

/***/ "./src/components/Menu.js":
/*!********************************!*\
  !*** ./src/components/Menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Menu)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Menu({\n  filter,\n  setFilter = f => f\n}) {\n  const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row p-4\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col-lg-6 mx-auto rounded p-3 contrast\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", {\n    style: {\n      textAlign: 'center'\n    }\n  }, \"Fitler\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"radio\",\n    checked: filter.status === 'Dates',\n    onChange: () => setFilter({\n      status: 'Dates'\n    })\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", null, \"Daets\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"radio\",\n    checked: filter.status === 'Likes',\n    onChange: () => setFilter({\n      status: 'Likes'\n    })\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", null, \"Lieks\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"radio\",\n    checked: filter.status === 'Dislikes',\n    onChange: () => setFilter({\n      status: 'Dislikes'\n    })\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", null, \"Dislieks\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"radio\",\n    checked: filter.status === 'Comments',\n    onChange: () => setFilter({\n      status: 'Comments'\n    })\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", null, \"Commetns\")))));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/Menu.js?");

/***/ }),

/***/ "./src/components/PartialPost.js":
/*!***************************************!*\
  !*** ./src/components/PartialPost.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PartialPost)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction PartialPost({\n  post\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col-lg-2 p-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    className: \"rounded\",\n    style: {\n      width: '100px',\n      height: '100px'\n    },\n    src: post.profile,\n    alt: \"\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", {\n    className: \"col-lg-6\",\n    style: {\n      marginLeft: 40,\n      display: 'flex',\n      alignItems: 'center'\n    }\n  }, post.name)), post.image !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col-lg-10 mx-auto\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    className: \"rounded\",\n    width: 600,\n    height: 400,\n    src: post.image\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, post.caption));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/PartialPost.js?");

/***/ }),

/***/ "./src/components/Post.js":
/*!********************************!*\
  !*** ./src/components/Post.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Post)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_icons_gi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/gi */ \"react-icons/gi\");\n/* harmony import */ var react_icons_gi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_gi__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _misc_CrabMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../misc/CrabMessage */ \"./src/misc/CrabMessage.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _PartialPost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PartialPost */ \"./src/components/PartialPost.js\");\n/* harmony import */ var _helpers_ApiUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/ApiUrl */ \"./src/helpers/ApiUrl.js\");\n\n\n\n\n\n\nfunction Post({\n  post,\n  state,\n  setRender = f => f\n}) {\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();\n  const id = state.account?._id ?? null;\n  const disabled = id === null;\n  const updatePost = async body => {\n    await fetch(`${_helpers_ApiUrl__WEBPACK_IMPORTED_MODULE_5__[\"default\"]}/api/posts/update/${post._id}`, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(body)\n    });\n    setRender(true);\n  };\n  const onLike = () => {\n    updatePost({\n      method: 'Like',\n      _id: id\n    });\n  };\n  const onDislike = () => {\n    updatePost({\n      method: 'Dislike',\n      _id: id\n    });\n  };\n  const onComment = () => {\n    navigate('/Comments', {\n      state: {\n        post: post\n      }\n    });\n  };\n  let numLikes = post.likes.length;\n  let numDislikes = post.dislikes.length;\n  let numComments = post.comments.length;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      marginBottom: '10px'\n    },\n    className: \"contrast rounded p-3\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PartialPost__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    post: post\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col-lg-1\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\",\n    onClick: () => onLike(),\n    disabled: disabled\n  }, post.likes.includes(id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_gi__WEBPACK_IMPORTED_MODULE_1__.GiCrabClaw, {\n    className: \"clawLike\",\n    size: 40,\n    style: {\n      color: '#fb551c'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_gi__WEBPACK_IMPORTED_MODULE_1__.GiCrabClaw, {\n    className: \"clawLike\",\n    size: 40\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h6\", {\n    style: {\n      textAlign: 'center'\n    }\n  }, numLikes > 1000 ? numLikes / 1000 + 'k' : numLikes)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col-lg-1\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\",\n    onClick: () => onDislike(),\n    disabled: disabled\n  }, post.dislikes.includes(id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_gi__WEBPACK_IMPORTED_MODULE_1__.GiCrabClaw, {\n    className: \"clawDislike\",\n    size: 40,\n    style: {\n      color: '#fb551c'\n    }\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_gi__WEBPACK_IMPORTED_MODULE_1__.GiCrabClaw, {\n    className: \"clawDislike\",\n    size: 40\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h6\", {\n    style: {\n      textAlign: 'center'\n    }\n  }, numDislikes > 1000 ? numDislikes / 1000 + 'k' : numDislikes)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"col-lg-1\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\",\n    onClick: () => onComment()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_misc_CrabMessage__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    size: 40\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h6\", {\n    style: {\n      textAlign: 'center'\n    }\n  }, numComments > 1000 ? numComments / 1000 + 'k' : numComments))));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/Post.js?");

/***/ }),

/***/ "./src/components/Posts.js":
/*!*********************************!*\
  !*** ./src/components/Posts.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Posts)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-storage-complete */ \"react-storage-complete\");\n/* harmony import */ var react_storage_complete__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_storage_complete__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/md */ \"react-icons/md\");\n/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Menu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Menu.js */ \"./src/components/Menu.js\");\n/* harmony import */ var _Post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Post */ \"./src/components/Post.js\");\n/* harmony import */ var _AddPost_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AddPost.js */ \"./src/components/AddPost.js\");\n/* harmony import */ var _helpers_ApiUrl_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/ApiUrl.js */ \"./src/helpers/ApiUrl.js\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n\nfunction Posts({\n  state,\n  account\n}) {\n  const [posts, setPosts] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_1__.useSessionStorage)('Posts', []);\n  const [filter, setFilter] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_1__.useSessionStorage)('Filter', {\n    status: 'Dates'\n  });\n  const [render, setRender] = (0,react_storage_complete__WEBPACK_IMPORTED_MODULE_1__.useSessionStorage)('Render', false);\n  const navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();\n  const supplementPosts = async (post, callback) => {\n    const response = await fetch(`${_helpers_ApiUrl_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]}/api/account/${post.user}`);\n    if (response.ok) {\n      const data = await response.json();\n      return {\n        ...post,\n        ...data\n      };\n    }\n    return post;\n  };\n  const getPosts = async () => {\n    const response = await fetch(`${_helpers_ApiUrl_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]}/api/posts/${account ? state.account._id : ''}`);\n    if (response.ok) {\n      const data = await response.json();\n      const posts = await Promise.all(data.map((x, i) => supplementPosts(x)));\n      switch (filter.status) {\n        case 'Likes':\n          setPosts(posts.sort((a, b) => b.likes.length - a.likes.length));\n          break;\n        case 'Dislikes':\n          setPosts(posts.sort((a, b) => b.dislikes.length - a.dislikes.length));\n          break;\n        case 'Comments':\n          setPosts(posts.sort((a, b) => b.comments.length - a.comments.length));\n          break;\n        case 'Dates':\n          setPosts(posts.sort((a, b) => new Date(b.date) - new Date(a.date)));\n          break;\n        default:\n          setPosts(posts);\n      }\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getPosts();\n    return () => {\n      setRender(false);\n    };\n  }, [filter, render]);\n  const addPost = newPost => {\n    let body = {\n      user: state.account._id,\n      image: null,\n      caption: newPost.message\n    };\n    const uploadPost = async () => {\n      await fetch(`${_helpers_ApiUrl_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]}/api/posts/`, {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(body)\n      });\n      setRender(true);\n    };\n    if (newPost.image?.name ?? null) {\n      const reader = new FileReader();\n      reader.onloadend = () => {\n        body.image = reader.result;\n        uploadPost();\n      };\n      reader.readAsDataURL(newPost.image);\n    } else {\n      uploadPost();\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, !account && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"table\", {\n    style: {\n      width: '100%'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"tr\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"th\", {\n    style: {\n      textAlign: 'center'\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"th\", {\n    style: {\n      textAlign: 'right'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\",\n    onClick: () => navigate('/Account')\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_2__.MdAccountCircle, {\n    size: 40\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, \"Accoutn\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", {\n    className: \"col-lg-3 mx-auto m-3\"\n  }, \"Lobter Biskueue\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Menu_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    filter: filter,\n    setFilter: setFilter\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      backgroundColor: 'grey'\n    },\n    className: \"col-lg-6 mx-auto p-3 rounded\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", {\n    style: {\n      textAlign: 'center'\n    }\n  }, \"Post's\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AddPost_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    state: state,\n    addPost: addPost\n  }), posts.map((post, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Post__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    key: i,\n    post: post,\n    state: state,\n    setRender: setRender\n  })))));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/components/Posts.js?");

/***/ }),

/***/ "./src/helpers/ApiUrl.js":
/*!*******************************!*\
  !*** ./src/helpers/ApiUrl.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst ApiUrl =  true ? \"http://localhost:4000\" : 0;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiUrl);\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/helpers/ApiUrl.js?");

/***/ }),

/***/ "./src/misc/CrabMessage.js":
/*!*********************************!*\
  !*** ./src/misc/CrabMessage.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CrabMessage)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction CrabMessage({\n  className,\n  size = 30,\n  style = {}\n}) {\n  style.width = style.width ?? size;\n  style.height = style.height ?? size;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"svg\", {\n    className: className,\n    style: style,\n    version: \"1.0\",\n    xmlns: \"http://www.w3.org/2000/svg\",\n    viewBox: \"0 0 300.000000 264.000000\",\n    preserveAspectRatio: \"xMidYMid meet\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"g\", {\n    transform: \"translate(0.000000,264.000000) scale(0.100000,-0.100000)\",\n    fill: \"#000000\",\n    stroke: \"black\",\n    strokeWidth: \"50\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M600 2565 c-77 -21 -166 -67 -223 -114 -119 -99 -175 -207 -202 -387\\r -8 -49 -7 -50 101 -59 l79 -7 39 37 c40 36 40 43 1 59 -6 2 -4 13 4 27 8 13\\r 17 40 20 59 5 29 16 42 64 73 46 31 57 44 57 65 0 41 52 96 122 131 53 27 72\\r 31 144 31 85 0 100 6 89 39 -16 51 -181 77 -295 46z m203 -28 c41 -14 33 -22\\r -25 -25 -63 -3 -128 -19 -128 -32 0 -6 -6 -10 -13 -10 -24 0 -95 -69 -117\\r -114 -11 -25 -44 -64 -73 -89 -43 -37 -54 -53 -66 -98 -7 -30 -13 -65 -13 -79\\r 0 -39 -16 -50 -73 -50 -70 0 -85 7 -85 39 1 95 64 225 154 313 124 123 317\\r 186 439 145z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M2155 2568 c-36 -13 -75 -46 -75 -65 0 -16 25 -21 120 -26 88 -3 135\\r -23 197 -82 33 -32 43 -49 43 -74 0 -25 6 -35 31 -49 58 -31 89 -63 89 -89 0\\r -14 8 -38 17 -54 18 -30 14 -39 -21 -52 -5 -2 8 -20 30 -41 l39 -38 79 7 c110\\r 9 109 8 101 69 -27 212 -141 371 -328 455 -106 48 -247 65 -322 39z m210 -33\\r c192 -50 336 -185 390 -367 20 -67 20 -114 -1 -122 -9 -3 -39 -6 -69 -6 -56 0\\r -82 17 -71 45 3 9 -1 35 -9 58 -8 23 -15 50 -15 59 0 9 -25 38 -55 64 -31 26\\r -63 65 -74 88 -36 79 -132 146 -225 155 -33 3 -61 11 -63 18 -8 24 109 29 192\\r 8z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M1021 2218 c-31 -74 -145 -164 -202 -160 -20 2 -40 -12 -85 -58 -48\\r -50 -64 -60 -92 -60 -37 0 -63 12 -105 46 -16 13 -33 24 -38 24 -5 0 -30 -19\\r -54 -41 l-45 -42 -121 7 -120 7 -14 -33 c-21 -51 -55 -242 -55 -306 1 -63 19\\r -123 47 -154 10 -12 42 -37 72 -56 48 -31 59 -34 103 -29 63 8 141 50 185 102\\r 20 22 51 74 70 115 52 112 72 134 171 181 48 22 104 55 125 71 100 80 223 322\\r 203 402 -9 38 -24 32 -45 -16z m-35 -160 c-33 -72 -103 -167 -152 -204 -21\\r -17 -70 -45 -109 -63 -88 -41 -139 -95 -192 -203 -103 -208 -277 -253 -380\\r -97 -20 31 -27 54 -28 99 -3 66 29 250 50 290 13 25 15 26 92 19 43 -4 87 -5\\r 97 -3 43 8 85 26 101 44 23 25 42 25 80 0 42 -28 98 -42 127 -31 12 5 46 31\\r 74 57 38 37 66 54 112 68 34 10 62 21 62 25 0 3 18 17 40 31 22 14 40 29 41\\r 35 0 5 3 5 5 -1 3 -6 -6 -36 -20 -66z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M1916 2244 c-3 -9 -6 -24 -6 -34 0 -36 49 -162 90 -230 61 -103 122\\r -160 234 -214 108 -53 128 -74 179 -187 57 -124 151 -203 257 -216 43 -5 55\\r -2 98 25 93 60 122 112 122 218 0 71 -32 245 -55 301 l-14 34 -118 -7 -119 -7\\r -47 42 c-27 22 -52 41 -57 41 -4 0 -27 -16 -50 -35 -33 -28 -51 -35 -84 -35\\r -38 0 -47 5 -100 61 -44 47 -62 60 -78 56 -51 -14 -190 97 -208 164 -11 40\\r -33 51 -44 23z m118 -166 c26 -24 101 -58 127 -58 12 0 42 -20 67 -46 52 -52\\r 67 -61 108 -68 27 -4 43 2 122 46 30 18 31 18 60 -11 37 -38 92 -52 167 -43\\r 98 11 108 10 122 -19 7 -15 22 -75 34 -135 34 -173 15 -254 -72 -314 -113 -77\\r -236 -14 -326 165 -57 115 -89 148 -193 199 -82 40 -150 95 -195 159 -36 51\\r -75 129 -75 150 0 21 5 18 54 -25z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M1170 1700 c-12 -12 -20 -33 -20 -55 l0 -35 -90 0 c-66 0 -104 -5\\r -144 -21 -73 -27 -148 -96 -183 -167 l-28 -57 0 -355 0 -355 28 -56 c30 -63\\r 93 -126 155 -158 52 -27 170 -45 249 -38 l62 5 3 -113 3 -112 194 110 195 109\\r 167 -1 c256 -3 340 20 430 116 82 88 84 97 84 498 l0 350 -28 57 c-35 71 -110\\r 140 -183 167 -40 16 -78 21 -144 21 l-90 0 0 35 c0 64 -65 97 -118 59 -16 -11\\r -22 -25 -22 -55 l0 -39 -200 0 -200 0 0 38 c0 25 -7 45 -18 55 -25 23 -78 21\\r -102 -3z m85 -54 c28 -66 28 -66 230 -66 101 0 191 3 200 6 9 4 25 27 36 51\\r 15 36 23 44 41 41 14 -2 24 -11 26 -23 2 -11 11 -31 22 -45 16 -22 28 -25 113\\r -31 141 -11 237 -65 290 -163 21 -39 22 -56 27 -370 3 -215 1 -344 -6 -375\\r -22 -95 -67 -149 -164 -198 -54 -27 -60 -27 -275 -33 l-220 -5 -70 -41 c-107\\r -64 -257 -145 -261 -141 -1 1 -4 35 -7 76 -5 100 -18 111 -136 111 -169 0\\r -280 56 -334 170 l-27 55 3 355 c2 352 2 355 25 395 61 103 151 154 290 163\\r 75 4 89 8 109 30 13 14 23 33 23 43 0 17 13 27 38 28 7 1 19 -14 27 -33z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M1035 1097 c-46 -26 -65 -57 -65 -110 0 -63 62 -127 123 -127 34 0\\r 89 32 108 64 65 107 -57 235 -166 173z m106 -27 c10 -6 26 -24 35 -41 32 -62\\r -13 -129 -86 -129 -30 0 -44 6 -64 31 -35 41 -34 83 3 120 31 31 75 38 112 19z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M1441 1102 c-48 -23 -64 -48 -69 -107 -4 -53 -3 -57 31 -89 39 -37\\r 91 -52 128 -37 112 46 118 189 9 235 -42 17 -60 17 -99 -2z m100 -32 c10 -6\\r 26 -24 35 -41 32 -62 -13 -129 -86 -129 -30 0 -44 6 -64 31 -35 41 -34 83 3\\r 120 31 31 75 38 112 19z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M1834 1094 c-53 -36 -63 -52 -64 -99 0 -46 28 -98 62 -116 33 -18 99\\r -15 130 5 30 19 58 72 58 108 0 58 -69 128 -126 128 -12 0 -39 -12 -60 -26z\\r m123 -38 c39 -34 39 -98 0 -132 -42 -36 -98 -33 -131 7 -35 41 -34 83 3 120\\r 38 37 88 39 128 5z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M553 1425 c-28 -42 -116 -113 -151 -121 -15 -4 -31 -9 -35 -11 -4 -3\\r 48 -38 115 -78 l123 -73 6 122 c3 67 11 131 18 144 14 26 15 25 -16 41 -31 16\\r -36 14 -60 -24z m29 -117 c-4 -87 -11 -106 -34 -92 -7 5 -15 9 -18 9 -13 1\\r -70 40 -74 51 -2 6 22 33 55 60 32 27 59 53 59 57 0 5 4 6 8 3 5 -3 7 -42 4\\r -88z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M2364 1448 c-20 -9 -21 -12 -8 -56 8 -26 14 -90 14 -149 0 -56 2\\r -103 4 -103 2 0 55 32 117 70 62 39 116 70 121 70 18 0 -3 18 -28 24 -42 11\\r -111 63 -147 111 -34 47 -40 50 -73 33z m79 -87 c23 -22 53 -48 67 -59 l25\\r -20 -25 -21 c-14 -11 -31 -20 -37 -21 -7 0 -13 -5 -13 -12 0 -6 -3 -8 -7 -5\\r -3 4 -12 2 -20 -5 -8 -7 -17 -7 -23 -2 -7 8 -19 184 -12 184 2 0 22 -18 45\\r -39z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M556 758 c-54 -15 -110 -74 -124 -131 -21 -83 -10 -222 18 -222 10 0\\r 17 16 22 53 14 96 70 172 126 172 22 0 24 3 18 31 -3 17 -6 49 -6 70 0 22 -3\\r 39 -7 38 -5 -1 -25 -6 -47 -11z m24 -58 c0 -19 -14 -36 -57 -71 -11 -9 -27\\r -27 -36 -39 -21 -31 -31 -20 -23 24 13 68 116 144 116 86z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M2370 723 c0 -27 -3 -58 -6 -70 -5 -20 -2 -23 19 -23 59 0 121 -91\\r 129 -190 4 -41 29 -48 39 -10 11 39 10 161 -2 203 -15 54 -62 103 -116 121\\r -26 9 -50 16 -55 16 -4 0 -8 -21 -8 -47z m94 -24 c31 -24 46 -51 57 -96 9 -41\\r -1 -42 -29 -3 -12 16 -35 36 -51 44 -28 15 -42 40 -34 64 7 18 27 15 57 -9z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M623 517 c-69 -72 -81 -154 -35 -248 32 -65 88 -127 102 -113 8 8 6\\r 27 -9 72 -12 34 -21 75 -21 93 0 39 26 95 53 114 l21 15 -25 27 c-14 16 -33\\r 38 -41 50 l-15 23 -30 -33z m47 -47 c9 -16 7 -26 -8 -48 -22 -30 -41 -91 -35\\r -109 2 -6 0 -14 -5 -17 -14 -8 -34 81 -27 115 6 25 46 79 59 79 3 0 10 -9 16\\r -20z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M2286 484 l-38 -45 26 -24 c51 -47 59 -110 26 -202 -24 -68 -24 -73\\r -6 -73 20 0 80 76 105 131 25 53 27 129 5 172 -16 32 -63 87 -73 87 -3 -1 -23\\r -21 -45 -46z m81 -41 c18 -28 27 -111 13 -128 -5 -5 -8 -14 -8 -20 0 -5 -5\\r -11 -11 -13 -7 -2 -11 11 -11 32 0 20 -11 58 -24 85 -19 36 -22 51 -13 60 18\\r 18 35 13 54 -16z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M781 358 c-17 -48 -13 -88 13 -143 29 -62 121 -154 137 -138 8 8 3\\r 25 -15 62 -35 68 -43 130 -23 170 12 24 12 31 3 31 -7 0 -34 11 -59 24 l-46\\r 25 -10 -31z m67 -91 c2 -36 -1 -57 -8 -57 -15 0 -30 44 -30 86 0 28 4 35 18\\r 32 13 -2 18 -15 20 -61z\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"path\", {\n    d: \"M2133 361 c-44 -22 -51 -29 -45 -46 16 -44 7 -119 -21 -174 -49 -96\\r 1 -86 84 16 55 70 73 147 46 204 l-12 25 -52 -25z m40 -58 c6 -31 -16 -93 -32\\r -93 -12 0 -15 102 -4 113 14 15 31 6 36 -20z\"\n  })));\n}\n\n//# sourceURL=webpack://lobster-bisque-v2/./src/misc/CrabMessage.js?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-icons/bs":
/*!*********************************!*\
  !*** external "react-icons/bs" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("react-icons/bs");

/***/ }),

/***/ "react-icons/gi":
/*!*********************************!*\
  !*** external "react-icons/gi" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("react-icons/gi");

/***/ }),

/***/ "react-icons/io5":
/*!**********************************!*\
  !*** external "react-icons/io5" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("react-icons/io5");

/***/ }),

/***/ "react-icons/md":
/*!*********************************!*\
  !*** external "react-icons/md" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("react-icons/md");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-router-dom/server.js":
/*!*********************************************!*\
  !*** external "react-router-dom/server.js" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("react-router-dom/server.js");

/***/ }),

/***/ "react-storage-complete":
/*!*****************************************!*\
  !*** external "react-storage-complete" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("react-storage-complete");

/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("constants");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	
/******/ })()
;