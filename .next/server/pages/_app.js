/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/context/AuthContext.js":
/*!************************************!*\
  !*** ./src/context/AuthContext.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": () => (/* binding */ AuthContext),\n/* harmony export */   \"AuthContextProvider\": () => (/* binding */ AuthContextProvider),\n/* harmony export */   \"authReducer\": () => (/* binding */ authReducer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst authReducer = (state, action)=>{\n    switch(action.type){\n        case \"LOGIN\":\n            return {\n                user: action.payload\n            };\n        case \"LOGOUT\":\n            return {\n                user: null\n            };\n        default:\n            return state;\n    }\n};\nconst AuthContextProvider = ({ children  })=>{\n    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(authReducer, {\n        user: null\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const user = JSON.parse(localStorage.getItem(\"user\"));\n        if (user) {\n            dispatch({\n                type: \"LOGIN\",\n                payload: user\n            });\n        }\n    }, []);\n    console.log(\"AuthContext state:\", state);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            ...state,\n            dispatch\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\wamp64\\\\www\\\\nft-mart\\\\react-site-files\\\\frontend\\\\src\\\\context\\\\AuthContext.js\",\n        lineNumber: 32,\n        columnNumber: 9\n    }, undefined);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dC9BdXRoQ29udGV4dC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE2RDtBQUV0RCxNQUFNRyw0QkFBY0gsb0RBQWFBLEdBQUc7QUFFcEMsTUFBTUksY0FBYyxDQUFDQyxPQUFPQyxTQUFXO0lBQzFDLE9BQVFBLE9BQU9DLElBQUk7UUFDZixLQUFLO1lBQ0QsT0FBTztnQkFBRUMsTUFBTUYsT0FBT0csT0FBTztZQUFDO1FBQ2xDLEtBQUs7WUFDRCxPQUFPO2dCQUFFRCxNQUFNLElBQUk7WUFBQztRQUN4QjtZQUNJLE9BQU9IO0lBQ2Y7QUFDSixFQUFFO0FBRUssTUFBTUssc0JBQXNCLENBQUMsRUFBRUMsU0FBUSxFQUFFLEdBQUs7SUFDakQsTUFBTSxDQUFDTixPQUFPTyxTQUFTLEdBQUdYLGlEQUFVQSxDQUFDRyxhQUFhO1FBQzlDSSxNQUFNLElBQUk7SUFDZDtJQUVBTixnREFBU0EsQ0FBQyxJQUFNO1FBQ1osTUFBTU0sT0FBT0ssS0FBS0MsS0FBSyxDQUFDQyxhQUFhQyxPQUFPLENBQUM7UUFFN0MsSUFBSVIsTUFBTTtZQUNOSSxTQUFTO2dCQUFFTCxNQUFNO2dCQUFTRSxTQUFTRDtZQUFLO1FBQzVDLENBQUM7SUFDTCxHQUFHLEVBQUU7SUFFTFMsUUFBUUMsR0FBRyxDQUFDLHNCQUFzQmI7SUFFbEMscUJBQ0ksOERBQUNGLFlBQVlnQixRQUFRO1FBQUNDLE9BQU87WUFBRSxHQUFHZixLQUFLO1lBQUVPO1FBQVM7a0JBQzdDRDs7Ozs7O0FBR2IsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL251cm9uLW5leHRqcy8uL3NyYy9jb250ZXh0L0F1dGhDb250ZXh0LmpzPzRiYTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlUmVkdWNlciwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcblxuZXhwb3J0IGNvbnN0IGF1dGhSZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJMT0dJTlwiOlxuICAgICAgICAgICAgcmV0dXJuIHsgdXNlcjogYWN0aW9uLnBheWxvYWQgfTtcbiAgICAgICAgY2FzZSBcIkxPR09VVFwiOlxuICAgICAgICAgICAgcmV0dXJuIHsgdXNlcjogbnVsbCB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBBdXRoQ29udGV4dFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihhdXRoUmVkdWNlciwge1xuICAgICAgICB1c2VyOiBudWxsLFxuICAgIH0pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKTtcblxuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBcIkxPR0lOXCIsIHBheWxvYWQ6IHVzZXIgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIkF1dGhDb250ZXh0IHN0YXRlOlwiLCBzdGF0ZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgLi4uc3RhdGUsIGRpc3BhdGNoIH19PlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICAgICk7XG59O1xuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VSZWR1Y2VyIiwidXNlRWZmZWN0IiwiQXV0aENvbnRleHQiLCJhdXRoUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInVzZXIiLCJwYXlsb2FkIiwiQXV0aENvbnRleHRQcm92aWRlciIsImNoaWxkcmVuIiwiZGlzcGF0Y2giLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/context/AuthContext.js\n");

/***/ }),

/***/ "./src/pages/_app.jsx":
/*!****************************!*\
  !*** ./src/pages/_app.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var sal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sal.js */ \"sal.js\");\n/* harmony import */ var sal_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sal_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next-themes */ \"next-themes\");\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_themes__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/css/bootstrap.min.css */ \"./src/assets/css/bootstrap.min.css\");\n/* harmony import */ var _assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _assets_css_feather_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/css/feather.css */ \"./src/assets/css/feather.css\");\n/* harmony import */ var _assets_css_feather_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_css_feather_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/css/modal-video.css */ \"./src/assets/css/modal-video.css\");\n/* harmony import */ var _assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_css_modal_video_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/scss/style.scss */ \"./src/assets/scss/style.scss\");\n/* harmony import */ var _assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_scss_style_scss__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../context/AuthContext */ \"./src/context/AuthContext.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nconst MyApp = ({ Component , pageProps  })=>{\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        sal_js__WEBPACK_IMPORTED_MODULE_4___default()({\n            threshold: 0.1,\n            once: true\n        });\n    }, [\n        router.asPath\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        sal_js__WEBPACK_IMPORTED_MODULE_4___default()();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        document.body.className = `${pageProps.className}`;\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_themes__WEBPACK_IMPORTED_MODULE_5__.ThemeProvider, {\n        defaultTheme: \"dark\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthContext__WEBPACK_IMPORTED_MODULE_11__.AuthContextProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\wamp64\\\\www\\\\nft-mart\\\\react-site-files\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n                lineNumber: 28,\n                columnNumber: 17\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\wamp64\\\\www\\\\nft-mart\\\\react-site-files\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n            lineNumber: 27,\n            columnNumber: 13\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\wamp64\\\\www\\\\nft-mart\\\\react-site-files\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n        lineNumber: 26,\n        columnNumber: 9\n    }, undefined);\n};\nMyApp.propTypes = {\n    Component: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().elementType),\n    pageProps: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({\n        className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)\n    })\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUNDO0FBQ0s7QUFDZjtBQUNtQjtBQUNIO0FBQ047QUFDSTtBQUNRO0FBQ1o7QUFDMEI7QUFFN0QsTUFBTU0sUUFBUSxDQUFDLEVBQUVDLFVBQVMsRUFBRUMsVUFBUyxFQUFFLEdBQUs7SUFDeEMsTUFBTUMsU0FBU1Asc0RBQVNBO0lBQ3hCRixnREFBU0EsQ0FBQyxJQUFNO1FBQ1pHLDZDQUFHQSxDQUFDO1lBQUVPLFdBQVc7WUFBS0MsTUFBTSxJQUFJO1FBQUM7SUFDckMsR0FBRztRQUFDRixPQUFPRyxNQUFNO0tBQUM7SUFFbEJaLGdEQUFTQSxDQUFDLElBQU07UUFDWkcsNkNBQUdBO0lBQ1AsR0FBRyxFQUFFO0lBQ0xILGdEQUFTQSxDQUFDLElBQU07UUFDWmEsU0FBU0MsSUFBSSxDQUFDQyxTQUFTLEdBQUcsQ0FBQyxFQUFFUCxVQUFVTyxTQUFTLENBQUMsQ0FBQztJQUN0RDtJQUNBLHFCQUNJLDhEQUFDWCxzREFBYUE7UUFBQ1ksY0FBYTtrQkFDeEIsNEVBQUNYLHNFQUFtQkE7c0JBQ2hCLDRFQUFDRTtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7O0FBSXhDO0FBRUFGLE1BQU1XLFNBQVMsR0FBRztJQUNkVixXQUFXTiwrREFBcUI7SUFDaENPLFdBQVdQLHVEQUFlLENBQUM7UUFDdkJjLFdBQVdkLDBEQUFnQjtJQUMvQjtBQUNKO0FBRUEsaUVBQWVLLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9udXJvbi1uZXh0anMvLi9zcmMvcGFnZXMvX2FwcC5qc3g/NGM3NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHNhbCBmcm9tIFwic2FsLmpzXCI7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSBcIm5leHQtdGhlbWVzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL2ZlYXRoZXIuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvY3NzL21vZGFsLXZpZGVvLmNzc1wiO1xuaW1wb3J0IFwicmVhY3QtdG9hc3RpZnkvZGlzdC9SZWFjdFRvYXN0aWZ5LmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3Njc3Mvc3R5bGUuc2Nzc1wiO1xuaW1wb3J0IHsgQXV0aENvbnRleHRQcm92aWRlciB9IGZyb20gXCIuLi9jb250ZXh0L0F1dGhDb250ZXh0XCI7XG5cbmNvbnN0IE15QXBwID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkgPT4ge1xuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNhbCh7IHRocmVzaG9sZDogMC4xLCBvbmNlOiB0cnVlIH0pO1xuICAgIH0sIFtyb3V0ZXIuYXNQYXRoXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzYWwoKTtcbiAgICB9LCBbXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBgJHtwYWdlUHJvcHMuY2xhc3NOYW1lfWA7XG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPFRoZW1lUHJvdmlkZXIgZGVmYXVsdFRoZW1lPVwiZGFya1wiPlxuICAgICAgICAgICAgPEF1dGhDb250ZXh0UHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICAgICAgPC9BdXRoQ29udGV4dFByb3ZpZGVyPlxuICAgICAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICAgKTtcbn07XG5cbk15QXBwLnByb3BUeXBlcyA9IHtcbiAgICBDb21wb25lbnQ6IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcbiAgICBwYWdlUHJvcHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB9KSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsIlByb3BUeXBlcyIsInVzZVJvdXRlciIsInNhbCIsIlRoZW1lUHJvdmlkZXIiLCJBdXRoQ29udGV4dFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJyb3V0ZXIiLCJ0aHJlc2hvbGQiLCJvbmNlIiwiYXNQYXRoIiwiZG9jdW1lbnQiLCJib2R5IiwiY2xhc3NOYW1lIiwiZGVmYXVsdFRoZW1lIiwicHJvcFR5cGVzIiwiZWxlbWVudFR5cGUiLCJzaGFwZSIsInN0cmluZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.jsx\n");

/***/ }),

/***/ "./node_modules/react-toastify/dist/ReactToastify.css":
/*!************************************************************!*\
  !*** ./node_modules/react-toastify/dist/ReactToastify.css ***!
  \************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/assets/css/bootstrap.min.css":
/*!******************************************!*\
  !*** ./src/assets/css/bootstrap.min.css ***!
  \******************************************/
/***/ (() => {



/***/ }),

/***/ "./src/assets/css/feather.css":
/*!************************************!*\
  !*** ./src/assets/css/feather.css ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "./src/assets/css/modal-video.css":
/*!****************************************!*\
  !*** ./src/assets/css/modal-video.css ***!
  \****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/assets/scss/style.scss":
/*!************************************!*\
  !*** ./src/assets/scss/style.scss ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "next-themes":
/*!******************************!*\
  !*** external "next-themes" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-themes");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "sal.js":
/*!*************************!*\
  !*** external "sal.js" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("sal.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.jsx"));
module.exports = __webpack_exports__;

})();