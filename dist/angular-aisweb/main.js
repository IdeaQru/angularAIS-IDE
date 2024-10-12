(self["webpackChunkmyapp"] = self["webpackChunkmyapp"] || []).push([["main"],{

/***/ 23966:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard/dashboard.component */ 94225);
/* harmony import */ var _tables_tables_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tables/tables.component */ 17276);
/* harmony import */ var _newfitur_newfitur_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newfitur/newfitur.component */ 32644);
/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notification/notification.component */ 16878);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ 2014);
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./guards/auth.guard */ 1391);
/* harmony import */ var _mainlayout_mainlayout_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mainlayout/mainlayout.component */ 73633);
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./register/register.component */ 22844);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 61699);











const routes = [{
  path: 'login',
  component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent,
  children: [{
    path: '',
    component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent
  }]
}, {
  path: 'register',
  component: _register_register_component__WEBPACK_IMPORTED_MODULE_7__.RegisterComponent,
  children: [{
    path: '',
    component: _register_register_component__WEBPACK_IMPORTED_MODULE_7__.RegisterComponent
  }]
}, {
  path: '',
  component: _mainlayout_mainlayout_component__WEBPACK_IMPORTED_MODULE_6__.MainlayoutComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_5__.AuthGuard],
  children: [{
    path: 'dashboard',
    component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.DashboardComponent
  }, {
    path: 'tables',
    component: _tables_tables_component__WEBPACK_IMPORTED_MODULE_1__.TablesComponent
  }, {
    path: 'newfitur',
    component: _newfitur_newfitur_component__WEBPACK_IMPORTED_MODULE_2__.NewfiturComponent
  }, {
    path: 'notifications',
    component: _notification_notification_component__WEBPACK_IMPORTED_MODULE_3__.NotificationComponent
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }]
}, {
  path: '**',
  redirectTo: 'login'
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule]
  });
})();

/***/ }),

/***/ 66401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 33839);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.service */ 17015);
/* harmony import */ var _services_circle_zone_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/circle-zone-handler */ 23133);
/* harmony import */ var _services_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/polygon-zone-handler */ 58682);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);






class AppComponent {
  constructor(dataService, circleZoneHandler, polygonZoneHandler) {
    this.dataService = dataService;
    this.circleZoneHandler = circleZoneHandler;
    this.polygonZoneHandler = polygonZoneHandler;
    this.title = 'AIS Asset Web App';
    this.polygonZones = [];
    this.circleZones = [];
    this.ships = [];
    this.previousShips = []; // Menyimpan data kapal sebelumnya
  }

  ngOnInit() {
    this.loadZones();
    this.monitorShips();
  }
  loadZones() {
    this.polygonZoneHandler.loadPolygonZones().subscribe(zones => {
      this.polygonZones = zones;
    });
    this.circleZoneHandler.loadCircleZones().subscribe(zones => {
      this.circleZones = zones;
    });
  }
  monitorShips() {
    // Menggunakan combineLatest untuk menunggu kedua zona dan data kapal
    (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this.polygonZoneHandler.loadPolygonZones(), this.circleZoneHandler.loadCircleZones(), this.dataService.getShipsDataPeriodically()]).subscribe(([polygonZones, circleZones, ships]) => {
      this.polygonZones = polygonZones;
      this.circleZones = circleZones;
      this.ships = ships;
      // Panggil checkShipsInZones hanya jika ada kapal baru atau aplikasi baru dibuka
      if (this.previousShips.length === 0 || this.ships.length !== this.previousShips.length) {
        this.dataService.checkShipsInZones(this.polygonZones, this.circleZones, this.ships);
      }
      // Perbarui previousShips dengan data kapal terbaru
      this.previousShips = [...this.ships];
    });
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_service__WEBPACK_IMPORTED_MODULE_0__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_circle_zone_handler__WEBPACK_IMPORTED_MODULE_1__.CircleZoneHandler), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_2__.PolygonZoneHandler));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 1,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterOutlet],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 78629:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser/animations */ 24987);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 66401);
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar/navbar.component */ 92247);
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar/sidebar.component */ 22711);
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main/main.component */ 26542);
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./footer/footer.component */ 36515);
/* harmony import */ var _uiconfigurator_uiconfigurator_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uiconfigurator/uiconfigurator.component */ 99133);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.service */ 42266);
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard/dashboard.component */ 94225);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing.module */ 23966);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-apexcharts */ 57854);
/* harmony import */ var _tables_tables_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tables/tables.component */ 17276);
/* harmony import */ var _newfitur_newfitur_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./newfitur/newfitur.component */ 32644);
/* harmony import */ var _leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./leaflet-map/leaflet-map.component */ 30451);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./data.service */ 17015);
/* harmony import */ var _chart_chart_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./chart/chart.component */ 46627);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/table */ 46798);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/sort */ 87963);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/list */ 13228);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/icon */ 86515);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/card */ 18497);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/snack-bar */ 49409);
/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./notification/notification.component */ 16878);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/dialog */ 17401);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./login/login.component */ 2014);
/* harmony import */ var _mainlayout_mainlayout_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./mainlayout/mainlayout.component */ 73633);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/input */ 10026);
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./register/register.component */ 22844);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 61699);


















 // Import FormsModule here

















class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjector"]({
    providers: [_app_service__WEBPACK_IMPORTED_MODULE_6__.AppService, _data_service__WEBPACK_IMPORTED_MODULE_12__.DataService],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.BrowserModule, ng_apexcharts__WEBPACK_IMPORTED_MODULE_20__.NgApexchartsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_8__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_24__.MatSelectModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_25__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_26__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_27__.MatSortModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_28__.MatFormFieldModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_29__.MatSnackBarModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__.MatDialogModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_31__.MatButtonModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_32__.MatListModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_33__.MatIconModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_34__.MatCardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_35__.MatInputModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_1__.NavbarComponent, _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__.SidebarComponent, _main_main_component__WEBPACK_IMPORTED_MODULE_3__.MainComponent, _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__.FooterComponent, _uiconfigurator_uiconfigurator_component__WEBPACK_IMPORTED_MODULE_5__.UiconfiguratorComponent, _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__.DashboardComponent, _tables_tables_component__WEBPACK_IMPORTED_MODULE_9__.TablesComponent, _newfitur_newfitur_component__WEBPACK_IMPORTED_MODULE_10__.NewfiturComponent, _leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_11__.LeafletMapComponent, _chart_chart_component__WEBPACK_IMPORTED_MODULE_13__.ChartComponent, _notification_notification_component__WEBPACK_IMPORTED_MODULE_14__.NotificationComponent, _login_login_component__WEBPACK_IMPORTED_MODULE_15__.LoginComponent, _mainlayout_mainlayout_component__WEBPACK_IMPORTED_MODULE_16__.MainlayoutComponent, _register_register_component__WEBPACK_IMPORTED_MODULE_17__.RegisterComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.BrowserModule, ng_apexcharts__WEBPACK_IMPORTED_MODULE_20__.NgApexchartsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_8__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_24__.MatSelectModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_25__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_26__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_27__.MatSortModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_28__.MatFormFieldModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_29__.MatSnackBarModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__.MatDialogModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_31__.MatButtonModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_32__.MatListModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_33__.MatIconModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_34__.MatCardModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_35__.MatInputModule]
  });
})();

/***/ }),

/***/ 42266:
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppService: () => (/* binding */ AppService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 54860);


class AppService {
  constructor(http) {
    this.http = http;
    this.apiUrl = 'https://api.example.com';
    this.isPluginVisible = false;
  }
  get(endpoint) {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }
  post(endpoint, data) {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }
  callToggleSidenav() {
    // Panggil fungsi toggleSidenav dengan id "sidenav-main"
    toggleSidenav("sidenav-main");
  }
  togglePluginVisibility() {
    this.isPluginVisible = !this.isPluginVisible;
  }
  closeFixedPlugin() {
    this.isPluginVisible = false;
  }
  getIsPluginVisible() {
    return this.isPluginVisible;
  }
  static #_ = this.ɵfac = function AppService_Factory(t) {
    return new (t || AppService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: AppService,
    factory: AppService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 46627:
/*!******************************************!*\
  !*** ./src/app/chart/chart.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChartComponent: () => (/* binding */ ChartComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-apexcharts */ 57854);


const _c0 = function () {
  return {};
};
const _c1 = function () {
  return [];
};
class ChartComponent {
  constructor() {}
  ngOnInit() {}
  static #_ = this.ɵfac = function ChartComponent_Factory(t) {
    return new (t || ChartComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: ChartComponent,
    selectors: [["app-chart"]],
    inputs: {
      chartOptions: "chartOptions",
      chartId: "chartId"
    },
    decls: 1,
    vars: 30,
    consts: [[3, "series", "chart", "stroke", "dataLabels", "grid", "xaxis", "yaxis", "fill", "markers", "tooltip", "plotOptions", "labels", "legend", "colors", "title", "subtitle"]],
    template: function ChartComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "apx-chart", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("series", ctx.chartOptions.series)("chart", ctx.chartOptions.chart)("stroke", ctx.chartOptions.stroke || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](16, _c0))("dataLabels", ctx.chartOptions.dataLabels || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](17, _c0))("grid", ctx.chartOptions.grid || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](18, _c0))("xaxis", ctx.chartOptions.xaxis || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](19, _c0))("yaxis", ctx.chartOptions.yaxis || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](20, _c0))("fill", ctx.chartOptions.fill || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](21, _c0))("markers", ctx.chartOptions.markers || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](22, _c0))("tooltip", ctx.chartOptions.tooltip || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](23, _c0))("plotOptions", ctx.chartOptions.plotOptions || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](24, _c0))("labels", ctx.chartOptions.labels || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](25, _c1))("legend", ctx.chartOptions.legend || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](26, _c0))("colors", ctx.chartOptions.colors || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](27, _c1))("title", ctx.chartOptions.title || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](28, _c0))("subtitle", ctx.chartOptions.subtitle || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](29, _c0));
      }
    },
    dependencies: [ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__.ChartComponent],
    styles: ["body[_ngcontent-%COMP%] {\n  background: #343E59;\n  color: #777;\n  font-family: Montserrat, Arial, sans-serif;\n}\n\n.body-bg[_ngcontent-%COMP%] {\n  background: #F3F4FA !important;\n}\n\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n\n\n.content-area[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n}\n\n.box[_ngcontent-%COMP%] {\n  background-color: #17238f;\n  padding: 25px 20px;\n}\n\n.shadow[_ngcontent-%COMP%] {\n  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);\n}\n.sparkboxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%] {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  text-shadow: 0 1px 1px 1px #666;\n  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);\n  position: relative;\n  border-radius: 5px;\n}\n\n.sparkboxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {\n  position: absolute;\n  color: #fff;\n  transform: scale(0.7) translate(-22px, 20px);\n}\n.sparkboxes[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 3;\n  top: -8px;\n  color: #fff;\n}\n\n\n.sparkboxes[_ngcontent-%COMP%]   .box1[_ngcontent-%COMP%] {\n  background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);\n}\n\n.sparkboxes[_ngcontent-%COMP%]   .box2[_ngcontent-%COMP%] {\n  background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);\n}\n\n.sparkboxes[_ngcontent-%COMP%]   .box3[_ngcontent-%COMP%] {\n  background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);\n}\n\n.sparkboxes[_ngcontent-%COMP%]   .box4[_ngcontent-%COMP%] {\n  background-image: linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%);\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY2hhcnQvY2hhcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7RUFDRSxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7OztBQUlBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbURBQW1EO0FBQ3JEO0FBQ0E7RUFDRSxpQkFBaUI7RUFDakIsb0JBQW9CO0VBQ3BCLCtCQUErQjtFQUMvQixtREFBbUQ7RUFDbkQsa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsNENBQTRDO0FBQzlDO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxXQUFXO0FBQ2I7OztBQUdBO0VBQ0UscUVBQXFFO0FBQ3ZFOztBQUVBO0VBQ0UscUVBQXFFO0FBQ3ZFOztBQUVBO0VBQ0UscUVBQXFFO0FBQ3ZFOztBQUVBO0VBQ0UscUVBQXFFO0FBQ3ZFIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQ6ICMzNDNFNTk7XHJcbiAgY29sb3I6ICM3Nzc7XHJcbiAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4uYm9keS1iZyB7XHJcbiAgYmFja2dyb3VuZDogI0YzRjRGQSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBzdHJvbmcge1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcblxyXG5cclxuLmNvbnRlbnQtYXJlYSB7XHJcbiAgbWF4LXdpZHRoOiAxMjgwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi5ib3gge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMxNzIzOGY7XHJcbiAgcGFkZGluZzogMjVweCAyMHB4O1xyXG59XHJcblxyXG4uc2hhZG93IHtcclxuICBib3gtc2hhZG93OiAwcHggMXB4IDE1cHggMXB4IHJnYmEoNjksIDY1LCA3OCwgMC4wOCk7XHJcbn1cclxuLnNwYXJrYm94ZXMgLmJveCB7XHJcbiAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IDFweCAxcHggIzY2NjtcclxuICBib3gtc2hhZG93OiAwcHggMXB4IDE1cHggMXB4IHJnYmEoNjksIDY1LCA3OCwgMC4wOCk7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLnNwYXJrYm94ZXMgLmJveCAuZGV0YWlscyB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMC43KSB0cmFuc2xhdGUoLTIycHgsIDIwcHgpO1xyXG59XHJcbi5zcGFya2JveGVzIHN0cm9uZyB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHotaW5kZXg6IDM7XHJcbiAgdG9wOiAtOHB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG5cclxuLnNwYXJrYm94ZXMgLmJveDEge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggMTM1ZGVnLCAjQUJEQ0ZGIDEwJSwgIzAzOTZGRiAxMDAlKTtcclxufVxyXG5cclxuLnNwYXJrYm94ZXMgLmJveDIge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggMTM1ZGVnLCAjMkFGQURGIDEwJSwgIzRDODNGRiAxMDAlKTtcclxufVxyXG5cclxuLnNwYXJrYm94ZXMgLmJveDMge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggMTM1ZGVnLCAjRkZEM0E1IDEwJSwgI0ZENjU4NSAxMDAlKTtcclxufVxyXG5cclxuLnNwYXJrYm94ZXMgLmJveDQge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggMTM1ZGVnLCAjRUU5QUU1IDEwJSwgIzU5NjFGOSAxMDAlKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 94225:
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardComponent: () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data.service */ 17015);
/* harmony import */ var _services_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/polygon-zone-handler */ 58682);
/* harmony import */ var _services_circle_zone_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/circle-zone-handler */ 23133);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-apexcharts */ 57854);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 55309);









const _c0 = ["chart"];
function DashboardComponent_div_11_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const zone_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", zone_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](zone_r3.properties == null ? null : zone_r3.properties.name);
  }
}
function DashboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "mat-form-field", 3)(2, "mat-label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Select Polygon Zone");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "mat-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function DashboardComponent_div_11_Template_mat_select_selectionChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r4.onZoneChange($event.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, DashboardComponent_div_11_mat_option_5_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.polygonZones);
  }
}
function DashboardComponent_div_12_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const zone_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", zone_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](zone_r7.properties == null ? null : zone_r7.properties.name);
  }
}
function DashboardComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "mat-form-field", 3)(2, "mat-label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Select Circle Zone");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "mat-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function DashboardComponent_div_12_Template_mat_select_selectionChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r8.onZoneChange($event.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, DashboardComponent_div_12_mat_option_5_Template, 2, 2, "mat-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.circleZones);
  }
}
const shipTypeNames = {
  20: 'Tug',
  21: 'Tug',
  22: 'Tug',
  23: 'Tug',
  24: 'Tug',
  25: 'Tug',
  26: 'Tug',
  27: 'Tug',
  28: 'Tug',
  29: 'Unspecified',
  30: 'Fishing',
  31: 'Tug',
  32: 'Tug',
  33: 'AntiPollution',
  34: 'LawEnforcement',
  35: 'Medical',
  36: 'Military',
  37: 'Military',
  38: 'Sailing',
  39: 'Pleasure',
  40: 'Highspeed',
  41: 'Highspeed',
  42: 'Highspeed',
  43: 'Highspeed',
  44: 'Highspeed',
  45: 'Highspeed',
  46: 'Highspeed',
  47: 'Highspeed',
  48: 'Highspeed',
  49: 'Highspeed',
  50: 'Passenger',
  51: 'Passenger',
  52: 'Passenger',
  53: 'Passenger',
  54: 'Passenger',
  55: 'Passenger',
  56: 'Passenger',
  57: 'Passenger',
  58: 'Passenger',
  59: 'Passenger',
  60: 'Cargo',
  61: 'Cargo',
  62: 'Cargo',
  63: 'Cargo',
  64: 'Cargo',
  65: 'Cargo',
  66: 'Cargo',
  67: 'Cargo',
  68: 'Cargo',
  69: 'Cargo',
  70: 'Cargo',
  71: 'Cargo',
  72: 'Cargo',
  73: 'Cargo',
  74: 'Cargo',
  75: 'Cargo',
  76: 'Cargo',
  77: 'Cargo',
  78: 'Cargo',
  79: 'Cargo',
  80: 'Tanker',
  81: 'Tanker',
  82: 'Tanker',
  83: 'Tanker',
  84: 'Tanker',
  85: 'Tanker',
  86: 'Tanker',
  87: 'Tanker',
  88: 'Tanker',
  89: 'Tanker',
  90: 'Pilot',
  91: 'SearchAndRescue',
  92: 'Tug',
  93: 'PortTender',
  94: 'AntiPollution',
  95: 'LawEnforcement',
  96: 'Medical',
  97: 'Military',
  98: 'Sailing',
  99: 'Pleasure'
};
class DashboardComponent {
  constructor(dataService, polygonZoneHandler, circleZoneHandler) {
    this.dataService = dataService;
    this.polygonZoneHandler = polygonZoneHandler;
    this.circleZoneHandler = circleZoneHandler;
    this.ships = [];
    this.polygonZones = [];
    this.circleZones = [];
    this.selectedZoneType = '';
    this.selectedZone = null;
    this.pieChartOptions = {
      series: [],
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: [],
      title: {
        text: 'Ship Types in Selected Zone'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    this.barChartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Ship Types in Selected Zone (Bar Chart)'
      },
      xaxis: {
        categories: []
      }
    };
    this.lineChartOptions = {
      series: [],
      chart: {
        type: 'area',
        height: 350
      },
      title: {
        text: 'Ship Types Over Time'
      },
      xaxis: {
        categories: []
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillTo: 'end'
        }
      }
    };
  }
  ngOnInit() {
    this.loadPolygonZones();
    this.loadCircleZones();
    this.loadShips();
  }
  loadPolygonZones() {
    this.polygonZoneHandler.loadPolygonZones().subscribe(data => {
      this.polygonZones = data;
    });
  }
  loadCircleZones() {
    this.circleZoneHandler.loadCircleZones().subscribe(data => {
      this.circleZones = data;
    });
  }
  loadShips() {
    this.dataService.getShipsData().subscribe(data => {
      this.ships = data;
      this.updateChart();
    }, error => console.error('Failed to load ships:', error));
  }
  generateChartData(filteredShips) {
    const shipTypes = {};
    const shipTypesOverTime = {};
    filteredShips.forEach(ship => {
      const typeName = shipTypeNames[ship.type] || 'Unspecified';
      const timestampParts = ship.timestamp.split(' ');
      const dateParts = timestampParts[0].split('-');
      const timestamp = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timestampParts[1]}`).toLocaleDateString();
      if (shipTypes[typeName]) {
        shipTypes[typeName]++;
      } else {
        shipTypes[typeName] = 1;
      }
      if (!shipTypesOverTime[timestamp]) {
        shipTypesOverTime[timestamp] = {};
      }
      if (shipTypesOverTime[timestamp][typeName]) {
        shipTypesOverTime[timestamp][typeName]++;
      } else {
        shipTypesOverTime[timestamp][typeName] = 1;
      }
    });
    const series = Object.values(shipTypes);
    const labels = Object.keys(shipTypes);
    this.pieChartOptions.series = series;
    this.pieChartOptions.labels = labels;
    this.barChartOptions.series = [{
      name: 'Ships',
      data: series
    }];
    this.barChartOptions.xaxis = {
      categories: labels
    };
    const timestamps = Object.keys(shipTypesOverTime).sort();
    const areaSeries = labels.map(label => ({
      name: label,
      data: timestamps.map(timestamp => shipTypesOverTime[timestamp][label] || 0)
    }));
    this.lineChartOptions.series = areaSeries;
    this.lineChartOptions.xaxis = {
      categories: timestamps
    };
  }
  onZoneTypeChange(type) {
    this.selectedZoneType = type;
    this.selectedZone = null;
    this.updateChart();
  }
  onZoneChange(zone) {
    this.selectedZone = zone;
    this.updateChart();
  }
  updateChart() {
    if (!this.selectedZone || !this.ships.length) {
      this.pieChartOptions.series = [];
      this.pieChartOptions.labels = [];
      this.barChartOptions.series = [];
      this.barChartOptions.xaxis = {
        categories: []
      };
      this.lineChartOptions.series = [];
      this.lineChartOptions.xaxis = {
        categories: []
      };
      return;
    }
    const filteredShips = this.ships.filter(ship => this.isShipInZone(ship, this.selectedZone, this.selectedZoneType));
    this.generateChartData(filteredShips);
  }
  isShipInZone(ship, zone, type) {
    if (type === 'circle') {
      return this.circleZoneHandler.isShipInZone(ship, zone);
    } else if (type === 'polygon') {
      return this.polygonZoneHandler.isShipInZone(ship, zone);
    }
    return false;
  }
  static #_ = this.ɵfac = function DashboardComponent_Factory(t) {
    return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_data_service__WEBPACK_IMPORTED_MODULE_0__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_1__.PolygonZoneHandler), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_circle_zone_handler__WEBPACK_IMPORTED_MODULE_2__.CircleZoneHandler));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: DashboardComponent,
    selectors: [["app-dashboard"]],
    viewQuery: function DashboardComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.chart = _t.first);
      }
    },
    decls: 22,
    vars: 14,
    consts: [[1, "container"], [1, "row"], [1, "col-md-4"], ["appearance", "fill", 2, "width", "100%"], [2, "color", "black"], [2, "color", "black", 3, "selectionChange"], ["value", "polygon"], ["value", "circle"], ["class", "col-md-4", 4, "ngIf"], [1, "row", "mt-4"], [1, "col-md-12", "col-md-8", "d-flex", "justify-content-center"], [3, "series", "chart", "title", "labels"], [1, "col-md-12"], [3, "series", "chart", "title", "xaxis"], ["style", "color: black;", 3, "value", 4, "ngFor", "ngForOf"], [2, "color", "black", 3, "value"]],
    template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Select Zone Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function DashboardComponent_Template_mat_select_selectionChange_6_listener($event) {
          return ctx.onZoneTypeChange($event.value);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Polygon Zone");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Circle Zone");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, DashboardComponent_div_11_Template, 6, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, DashboardComponent_div_12_Template, 6, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 9)(14, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "apx-chart", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 9)(17, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "apx-chart", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 9)(20, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](21, "apx-chart", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.selectedZoneType === "polygon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.selectedZoneType === "circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("series", ctx.pieChartOptions.series)("chart", ctx.pieChartOptions.chart)("title", ctx.pieChartOptions.title)("labels", ctx.pieChartOptions.labels);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("series", ctx.barChartOptions.series)("chart", ctx.barChartOptions.chart)("title", ctx.barChartOptions.title)("xaxis", ctx.barChartOptions.xaxis);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("series", ctx.lineChartOptions.series)("chart", ctx.lineChartOptions.chart)("title", ctx.lineChartOptions.title)("xaxis", ctx.lineChartOptions.xaxis);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, ng_apexcharts__WEBPACK_IMPORTED_MODULE_5__.ChartComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_7__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatOption],
    styles: ["body[_ngcontent-%COMP%] {\n  background: #343E59;\n  color: #777;\n  font-family: Montserrat, Arial, sans-serif;\n}\n\n.body-bg[_ngcontent-%COMP%] {\n  background: #F3F4FA !important;\n}\n\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\nbody[_ngcontent-%COMP%] {\n  \n\n\n}\n\n.content-area[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n}\n\n.box[_ngcontent-%COMP%] {\n  background-color: #2B2D3E;\n  padding: 25px 20px;\n}\n\n.shadow[_ngcontent-%COMP%] {\n  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);\n}\n.sparkboxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%] {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  text-shadow: 0 1px 1px 1px #666;\n  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);\n  position: relative;\n  border-radius: 5px;\n}\n\n.sparkboxes[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%] {\n  position: absolute;\n  color: #fff;\n  transform: scale(0.7) translate(-22px, 20px);\n}\n.sparkboxes[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 3;\n  top: -8px;\n  color: #fff;\n}\n\n\n.sparkboxes[_ngcontent-%COMP%]   .box1[_ngcontent-%COMP%] {\n  background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);\n}\n\n.sparkboxes[_ngcontent-%COMP%]   .box2[_ngcontent-%COMP%] {\n  background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);\n}\n\n.sparkboxes[_ngcontent-%COMP%]   .box3[_ngcontent-%COMP%] {\n  background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);\n}\n\n.sparkboxes[_ngcontent-%COMP%]   .box4[_ngcontent-%COMP%] {\n  background-image: linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%);\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtFQUNFLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0U7cUJBQ21CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbURBQW1EO0FBQ3JEO0FBQ0E7RUFDRSxpQkFBaUI7RUFDakIsb0JBQW9CO0VBQ3BCLCtCQUErQjtFQUMvQixtREFBbUQ7RUFDbkQsa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsNENBQTRDO0FBQzlDO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxXQUFXO0FBQ2I7OztBQUdBO0VBQ0UscUVBQXFFO0FBQ3ZFOztBQUVBO0VBQ0UscUVBQXFFO0FBQ3ZFOztBQUVBO0VBQ0UscUVBQXFFO0FBQ3ZFOztBQUVBO0VBQ0UscUVBQXFFO0FBQ3ZFIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQ6ICMzNDNFNTk7XHJcbiAgY29sb3I6ICM3Nzc7XHJcbiAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4uYm9keS1iZyB7XHJcbiAgYmFja2dyb3VuZDogI0YzRjRGQSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBzdHJvbmcge1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIC8qYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCMzYTNhNjAsIzVmNWY4ZSk7XHJcbiAgbWluLWhlaWdodDogMTAwdmg7Ki9cclxufVxyXG5cclxuLmNvbnRlbnQtYXJlYSB7XHJcbiAgbWF4LXdpZHRoOiAxMjgwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi5ib3gge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyQjJEM0U7XHJcbiAgcGFkZGluZzogMjVweCAyMHB4O1xyXG59XHJcblxyXG4uc2hhZG93IHtcclxuICBib3gtc2hhZG93OiAwcHggMXB4IDE1cHggMXB4IHJnYmEoNjksIDY1LCA3OCwgMC4wOCk7XHJcbn1cclxuLnNwYXJrYm94ZXMgLmJveCB7XHJcbiAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IDFweCAxcHggIzY2NjtcclxuICBib3gtc2hhZG93OiAwcHggMXB4IDE1cHggMXB4IHJnYmEoNjksIDY1LCA3OCwgMC4wOCk7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLnNwYXJrYm94ZXMgLmJveCAuZGV0YWlscyB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMC43KSB0cmFuc2xhdGUoLTIycHgsIDIwcHgpO1xyXG59XHJcbi5zcGFya2JveGVzIHN0cm9uZyB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHotaW5kZXg6IDM7XHJcbiAgdG9wOiAtOHB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG5cclxuLnNwYXJrYm94ZXMgLmJveDEge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggMTM1ZGVnLCAjQUJEQ0ZGIDEwJSwgIzAzOTZGRiAxMDAlKTtcclxufVxyXG5cclxuLnNwYXJrYm94ZXMgLmJveDIge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggMTM1ZGVnLCAjMkFGQURGIDEwJSwgIzRDODNGRiAxMDAlKTtcclxufVxyXG5cclxuLnNwYXJrYm94ZXMgLmJveDMge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggMTM1ZGVnLCAjRkZEM0E1IDEwJSwgI0ZENjU4NSAxMDAlKTtcclxufVxyXG5cclxuLnNwYXJrYm94ZXMgLmJveDQge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCggMTM1ZGVnLCAjRUU5QUU1IDEwJSwgIzU5NjFGOSAxMDAlKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 17015:
/*!*********************************!*\
  !*** ./src/app/data.service.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataService: () => (/* binding */ DataService)
/* harmony export */ });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ 68589);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 72513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 13379);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 81891);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var _services_circle_zone_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/circle-zone-handler */ 23133);
/* harmony import */ var _services_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/polygon-zone-handler */ 58682);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/notification.service */ 36896);







class DataService {
  constructor(http, circleZoneHandler, polygonZoneHandler, notificationService) {
    this.http = http;
    this.circleZoneHandler = circleZoneHandler;
    this.polygonZoneHandler = polygonZoneHandler;
    this.notificationService = notificationService;
    this.apiUrl = 'http://165.154.208.232:3000/api/ships'; // Ubah dengan API endpoint Anda
    this.zonesApiUrl = 'http://165.154.208.232:3000/api/shapes'; // API endpoint untuk zona
    this.dataLog = 'http://165.154.208.232:3000/api/ais-log';
    this.socketUrl = 'http://165.154.208.232:3000'; // Ubah dengan URL WebSocket server Anda
    this.shipDataStream = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.shipZoneStatus = {};
    this.initializeWebSocketConnection();
  }
  getAisLogData() {
    return this.http.get(this.dataLog);
  }
  getShipsData() {
    return this.http.get(this.apiUrl);
  }
  getZonesData() {
    return this.http.get(this.zonesApiUrl);
  }
  getShipsDataPeriodically() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.interval)(30000).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(() => this.getShipsData()));
  }
  checkShipsInZones(polygonZones, circleZones, ships) {
    polygonZones.forEach(zone => {
      ships.forEach(ship => {
        if (this.polygonZoneHandler.isShipInZone(ship, zone)) {
          const zoneId = JSON.stringify(zone.coordinates); // Asumsikan koordinat adalah ID unik zona
          const previousStatus = this.shipZoneStatus[ship.mmsi]?.[zoneId] || false;
          if (this.polygonZoneHandler.isShipInZone(ship, zone) && !previousStatus) {
            const notificationMessage = `Ship ${ship.name} (${ship.mmsi}) entered ${zone.properties?.name || 'a polygon zone'}.`;
            console.log(notificationMessage);
            this.notificationService.addNotification({
              message: notificationMessage,
              timestamp: new Date().toLocaleTimeString()
            });
          }
        }
      });
    });
    circleZones.forEach(zone => {
      ships.forEach(ship => {
        if (this.circleZoneHandler.isShipInZone(ship, zone)) {
          const notificationMessage = `Ship ${ship.name} (${ship.mmsi}) entered ${zone.properties?.name || 'a circle zone'}.`;
          console.log(notificationMessage);
          this.notificationService.addNotification({
            message: notificationMessage,
            timestamp: new Date().toLocaleTimeString()
          });
        }
      });
    });
  }
  initializeWebSocketConnection() {
    this.socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_0__.io)(this.socketUrl, {
      path: '/api/ships'
    });
    this.socket.on('connect', () => console.log('Connected to WebSocket server!'));
    this.socket.on('aisData', data => {
      console.log('Received ship data via WebSocket:', data);
      this.shipDataStream.next(data);
      this.getZonesData().subscribe(zones => {
        const polygonZones = zones.filter(zone => zone.type === 'polygon');
        const circleZones = zones.filter(zone => zone.type === 'circle');
        this.checkShipsInZones(polygonZones, circleZones, data);
      });
    });
    this.socket.on('disconnect', () => console.log('Disconnected from WebSocket server'));
    this.socket.on('error', error => console.error('WebSocket error:', error));
  }
  getShipDataStream() {
    return this.shipDataStream.asObservable();
  }
  static #_ = this.ɵfac = function DataService_Factory(t) {
    return new (t || DataService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_circle_zone_handler__WEBPACK_IMPORTED_MODULE_1__.CircleZoneHandler), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_2__.PolygonZoneHandler), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_notification_service__WEBPACK_IMPORTED_MODULE_3__.NotificationService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: DataService,
    factory: DataService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 36515:
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterComponent: () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class FooterComponent {
  static #_ = this.ɵfac = function FooterComponent_Factory(t) {
    return new (t || FooterComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: FooterComponent,
    selectors: [["app-footer"]],
    decls: 24,
    vars: 0,
    consts: [[1, "container-fluid"], [1, "row", "align-items-center", "justify-content-lg-between"], [1, "col-lg-6", "mb-lg-0", "mb-4"], [1, "copyright", "text-center", "text-sm", "text-muted", "text-lg-start"], [1, "fa", "fa-heart"], ["href", "https://therichpost.com", "target", "_blank", 1, "font-weight-bold"], [1, "col-lg-6"], [1, "nav", "nav-footer", "justify-content-center", "justify-content-lg-end"], [1, "nav-item"], ["href", "https://therichpost.com", "target", "_blank", 1, "nav-link", "text-muted"], ["href", "https://therichpost.com", "target", "_blank", 1, "nav-link", "pe-0", "text-muted"]],
    template: function FooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " made with ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " by ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Laksana Future");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " for a better web. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6)(11, "ul", 7)(12, "li", 8)(13, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Therichpost");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "li", 8)(16, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "About Us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li", 8)(19, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Blog");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "li", 8)(22, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "License");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 1391:
/*!**************************************!*\
  !*** ./src/app/guards/auth.guard.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 32333);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);



class AuthGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate(route, state) {
    const isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect ke login jika belum login
      return false;
    }
    return true;
  }
  static #_ = this.ɵfac = function AuthGuard_Factory(t) {
    return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AuthGuard,
    factory: AuthGuard.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 30451:
/*!******************************************************!*\
  !*** ./src/app/leaflet-map/leaflet-map.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LeafletMapComponent: () => (/* binding */ LeafletMapComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 54524);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_map_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/map.service */ 88540);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.service */ 17015);
/* harmony import */ var _services_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/socket.service */ 94409);
/* harmony import */ var _services_marker_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/marker.service */ 34288);
/* harmony import */ var _services_heatmap_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/heatmap.service */ 48484);







class LeafletMapComponent {
  constructor(mapService, dataService, socketService, markerService,
  // Correct service for handling markers
  heatmapService // Correct service for handling heatmaps
  ) {
    this.mapService = mapService;
    this.dataService = dataService;
    this.socketService = socketService;
    this.markerService = markerService;
    this.heatmapService = heatmapService;
    this.searchQuery = '';
    this.zones = []; // Array untuk menyimpan data zona
    this.isFullscreen = false;
  }
  ngOnInit() {
    this.mapService.initializeMap('map');
    this.setupRealtimeUpdates();
    this.loadAndDisplayData();
  }
  ngOnDestroy() {
    this.mapService.destroyMap();
    this.socketService.disconnect();
    this.dataSubscription?.unsubscribe();
    this.aisUpdateSubscription?.unsubscribe();
    this.shapeUpdateSubscription?.unsubscribe();
  }
  loadAndDisplayData() {
    this.dataSubscription = this.dataService.getShipsDataPeriodically().subscribe({
      next: data => {
        this.markerService.addMarkers(this.mapService.getMapInstance(), data); // Use the correct service for markers
        this.heatmapService.addHeatMap(this.mapService.getMapInstance(), data); // Use the correct service for heatmaps
      },

      error: error => console.error('Failed to load data:', error)
    });
  }
  setupRealtimeUpdates() {
    this.aisUpdateSubscription = this.socketService.onAisDataUpdate().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.throttleTime)(1000)).subscribe(data => {
      this.markerService.addMarkers(this.mapService.getMapInstance(), [data]); // Use the correct service for markers
      this.heatmapService.addHeatMap(this.mapService.getMapInstance(), [data]); // Use the correct service for heatmaps
    });

    this.shapeUpdateSubscription = this.socketService.onShapeDataUpdate().subscribe(data => {
      this.markerService.addMarkers(this.mapService.getMapInstance(), [data]); // Use the correct service for markers
      this.heatmapService.addHeatMap(this.mapService.getMapInstance(), [data]); // Use the correct service for heatmaps
    });
  }
  static #_ = this.ɵfac = function LeafletMapComponent_Factory(t) {
    return new (t || LeafletMapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_map_service__WEBPACK_IMPORTED_MODULE_0__.MapService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_socket_service__WEBPACK_IMPORTED_MODULE_2__.SocketService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_marker_service__WEBPACK_IMPORTED_MODULE_3__.MarkerService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_heatmap_service__WEBPACK_IMPORTED_MODULE_4__.HeatmapService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: LeafletMapComponent,
    selectors: [["app-leaflet-map"]],
    decls: 8,
    vars: 0,
    consts: [[1, "row", "mt-4"], [1, "col-12", "mt-4", "mb-4"], [1, "card", "z-index-2"], [1, "card-header", "p-0", "position-relative", "mt-n4", "mx-3", "bg-transparent"], ["height", "170", 1, "cardmain4", "bg-gradient-primary", "active", "shadow-primary", "border-radius-lg", "py-3", "pe-1", "text-center", "align-items-center"], [1, "card-title", "text-center"], ["id", "map", 2, "width", "100%", "height", "500px"]],
    template: function LeafletMapComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h5", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "AIS MAPPING");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
      }
    },
    styles: ["\n\n#map[_ngcontent-%COMP%] {\n  position: relative;\n  height: 400px;  \n\n}\n.swal2-container[_ngcontent-%COMP%] {\n  z-index: 2147483647 !important; \n\n  position: fixed !important; \n\n}\n\n.playback-control-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.9);\n  border-radius: 10px;\n  padding: 15px;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n  position: absolute;\n  bottom: 20px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 1000;\n}\n\n.playback-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 10px;\n}\n\n.control-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 24px;\n  margin: 0 10px;\n  cursor: pointer;\n  color: #333;\n  transition: transform 0.2s ease-in-out;\n}\n\n.control-button[_ngcontent-%COMP%]:hover {\n  transform: scale(1.2);\n  color: #007bff; \n\n}\n\n.playback-speed[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin: 10px 0;\n}\n\n.speed-slider[_ngcontent-%COMP%] {\n  width: 150px;\n  margin-left: 10px;\n}\n\n.playback-date-range[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.playback-date-range[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin: 0 5px;\n}\n\n.date-picker[_ngcontent-%COMP%] {\n  padding: 5px;\n  margin: 0 5px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbGVhZmxldC1tYXAvbGVhZmxldC1tYXAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUI7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYSxHQUFHLGlDQUFpQztBQUNuRDtBQUNBO0VBQ0UsOEJBQThCLEVBQUUsNkNBQTZDO0VBQzdFLDBCQUEwQixFQUFFLG9EQUFvRDtBQUNsRjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixvQ0FBb0M7RUFDcEMsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYix3Q0FBd0M7RUFDeEMsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixTQUFTO0VBQ1QsMkJBQTJCO0VBQzNCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixlQUFlO0VBQ2YsY0FBYztFQUNkLGVBQWU7RUFDZixXQUFXO0VBQ1gsc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWMsRUFBRSwwQkFBMEI7QUFDNUM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBMZWFmbGV0IE1hcCBDb250YWluZXIgKi9cclxuI21hcCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGhlaWdodDogNDAwcHg7ICAvKiBBZGp1c3QgdGhpcyBoZWlnaHQgYXMgbmVlZGVkICovXHJcbn1cclxuLnN3YWwyLWNvbnRhaW5lciB7XHJcbiAgei1pbmRleDogMjE0NzQ4MzY0NyAhaW1wb3J0YW50OyAvKiBFbnN1cmUgaXQgaXMgYWx3YXlzIGFib3ZlIG90aGVyIGVsZW1lbnRzICovXHJcbiAgcG9zaXRpb246IGZpeGVkICFpbXBvcnRhbnQ7IC8qIFJlbWFpbiBmaXhlZCBldmVuIHdoZW4gdGhlIG1hcCBpcyBpbiBmdWxsc2NyZWVuICovXHJcbn1cclxuXHJcbi5wbGF5YmFjay1jb250cm9sLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgcGFkZGluZzogMTVweDtcclxuICBib3gtc2hhZG93OiAwIDJweCA2cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3R0b206IDIwcHg7XHJcbiAgbGVmdDogNTAlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICB6LWluZGV4OiAxMDAwO1xyXG59XHJcblxyXG4ucGxheWJhY2stYnV0dG9ucyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uY29udHJvbC1idXR0b24ge1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGZvbnQtc2l6ZTogMjRweDtcclxuICBtYXJnaW46IDAgMTBweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZS1pbi1vdXQ7XHJcbn1cclxuXHJcbi5jb250cm9sLWJ1dHRvbjpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xyXG4gIGNvbG9yOiAjMDA3YmZmOyAvKiBXYXJuYSBiaXJ1IHNhYXQgaG92ZXIgKi9cclxufVxyXG5cclxuLnBsYXliYWNrLXNwZWVkIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAxMHB4IDA7XHJcbn1cclxuXHJcbi5zcGVlZC1zbGlkZXIge1xyXG4gIHdpZHRoOiAxNTBweDtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxufVxyXG5cclxuLnBsYXliYWNrLWRhdGUtcmFuZ2Uge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnBsYXliYWNrLWRhdGUtcmFuZ2UgbGFiZWwge1xyXG4gIG1hcmdpbjogMCA1cHg7XHJcbn1cclxuXHJcbi5kYXRlLXBpY2tlciB7XHJcbiAgcGFkZGluZzogNXB4O1xyXG4gIG1hcmdpbjogMCA1cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 2014:
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 32333);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);





function LoginComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.errorMessage, " ");
  }
}
const _c0 = function () {
  return ["/register"];
};
class LoginComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }
  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).subscribe(response => {
      // Simpan token dan nama pengguna setelah login berhasil
      const userName = response.userName; // Asumsikan server mengirim nama pengguna
      const token = response.token; // Asumsikan server mengirim token
      localStorage.setItem('token', token); // Simpan token ke localStorage
      this.authService.saveUserName(userName); // Simpan nama pengguna ke localStorage
      console.log('Login response:', response); // Tambahkan ini untuk melihat respons
      this.router.navigate(['/dashboard']); // Arahkan pengguna ke halaman dashboard
    }, error => {
      this.errorMessage = 'Login failed! Please try again.';
      console.error('Login failed', error);
    });
  }
  static #_ = this.ɵfac = function LoginComponent_Factory(t) {
    return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["app-login"]],
    decls: 36,
    vars: 5,
    consts: [[1, "container", "position-sticky", "z-index-sticky", "top-0"], [1, "row"], [1, "col-12"], [1, "main-content", "mt-0"], [1, "page-header", "align-items-start", "min-vh-100", 2, "background-image", "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')"], [1, "mask", "bg-gradient-dark", "opacity-6"], [1, "container", "my-auto"], [1, "col-lg-4", "col-md-8", "col-12", "mx-auto"], [1, "card", "z-index-0", "fadeIn3", "fadeInBottom"], [1, "card-header", "p-0", "position-relative", "mt-n4", "mx-3", "z-index-2"], [1, "bg-gradient-primary", "shadow-primary", "border-radius-lg", "py-3", "pe-1"], [1, "text-white", "font-weight-bolder", "text-center", "mt-2", "mb-0"], [1, "card-body"], ["role", "form", 1, "text-start", 3, "ngSubmit"], [1, "input-group", "input-group-outline", "my-3"], [1, "form-label"], ["type", "email", "name", "email", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "input-group", "input-group-outline", "mb-3"], ["type", "password", "name", "password", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "form-check", "form-switch", "d-flex", "align-items-center", "mb-3"], ["type", "checkbox", "id", "rememberMe", "checked", "", 1, "form-check-input"], ["for", "rememberMe", 1, "form-check-label", "mb-0", "ms-3"], [1, "text-center"], ["type", "submit", 1, "btn", "bg-gradient-primary", "w-100", "my-4", "mb-2"], [1, "mt-4", "text-sm", "text-center"], [1, "text-primary", "text-gradient", "font-weight-bold", 3, "routerLink"], ["class", "text-danger text-center", 4, "ngIf"], [1, "text-danger", "text-center"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "main", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 6)(7, "div", 1)(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "div", 10)(12, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Login AIS Monitoring");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 12)(15, "form", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_15_listener() {
          return ctx.login();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 14)(17, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_19_listener($event) {
          return ctx.email = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 17)(21, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_23_listener($event) {
          return ctx.password = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](25, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Remember me");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 22)(29, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Sign in");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "p", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, " Don't have an account? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Sign up");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, LoginComponent_div_35_Template, 2, 1, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.errorMessage);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 72427:
/*!*********************************************!*\
  !*** ./src/app/main/circle-zone-handler.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CircleZoneHandler: () => (/* binding */ CircleZoneHandler)
/* harmony export */ });
/* harmony import */ var _turf_turf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/turf */ 25696);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 79736);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_circle_zone_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/circle-zone.service */ 20251);




class CircleZoneHandler {
  constructor(circleZoneService) {
    this.circleZoneService = circleZoneService;
  }
  // Metode untuk memuat zona lingkaran dari layanan CircleZoneService
  loadCircleZones() {
    return this.circleZoneService.getCircleZones().pipe(
    // Memproses data yang diterima dari layanan
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(data => data.map(zone => {
      // Periksa apakah koordinat dan radius ada dan valid
      if (!zone.coordinates || typeof zone.coordinates.radius !== 'number') return null;
      if (typeof zone.coordinates.lat !== 'number' || typeof zone.coordinates.lng !== 'number') return null;
      // Kembalikan zona dengan struktur yang diubah
      return {
        ...zone,
        center: {
          lat: zone.coordinates.lat,
          lng: zone.coordinates.lng
        },
        radius: zone.coordinates.radius // Set radius lingkaran
      };
    }).filter(zone => zone !== null)) // Hapus zona yang tidak valid
    );
  }
  // Metode untuk memeriksa apakah kapal berada dalam zona lingkaran
  isShipInZone(ship, zone) {
    // Hitung jarak antara kapal dan pusat lingkaran menggunakan turf.js
    const distance = _turf_turf__WEBPACK_IMPORTED_MODULE_2__.distance([ship.lon, ship.lat], [zone.center.lng, zone.center.lat], {
      units: 'meters'
    });
    return distance <= zone.radius; // Periksa apakah jarak kurang dari atau sama dengan radius lingkaran
  }
  static #_ = this.ɵfac = function CircleZoneHandler_Factory(t) {
    return new (t || CircleZoneHandler)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_services_circle_zone_service__WEBPACK_IMPORTED_MODULE_0__.CircleZoneService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: CircleZoneHandler,
    factory: CircleZoneHandler.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 26542:
/*!****************************************!*\
  !*** ./src/app/main/main.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainComponent: () => (/* binding */ MainComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _polygon_zone_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polygon-zone-handler */ 88986);
/* harmony import */ var _circle_zone_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circle-zone-handler */ 72427);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data.service */ 17015);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../leaflet-map/leaflet-map.component */ 30451);









function MainComponent_mat_option_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const zone_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", zone_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](zone_r2.properties == null ? null : zone_r2.properties.name);
  }
}
function MainComponent_mat_option_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const zone_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", zone_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](zone_r3.properties == null ? null : zone_r3.properties.name);
  }
}
class MainComponent {
  constructor(polygonZoneHandler, circleZoneHandler, dataService) {
    this.polygonZoneHandler = polygonZoneHandler;
    this.circleZoneHandler = circleZoneHandler;
    this.dataService = dataService;
    this.polygonZones = [];
    this.circleZones = [];
    this.ships = [];
    this.polygonShipCounts = {};
    this.circleShipCounts = {};
    this.currentSelectedPolygonZone = null;
    this.currentSelectedCircleZone = null;
  }
  ngOnInit() {
    this.loadPolygonZones();
    this.loadCircleZones();
    this.loadShips();
  }
  // Memuat zona poligon menggunakan PolygonZoneHandler
  loadPolygonZones() {
    this.polygonZoneHandler.loadPolygonZones().subscribe(data => {
      this.polygonZones = data;
    });
  }
  // Memuat zona lingkaran menggunakan CircleZoneHandler
  loadCircleZones() {
    this.circleZoneHandler.loadCircleZones().subscribe(data => {
      this.circleZones = data;
    });
  }
  // Memuat data kapal dari DataService
  loadShips() {
    this.dataService.getShipsData().subscribe(data => {
      this.ships = data;
      this.updateAllZoneCounts(); // Memperbarui jumlah kapal di semua zona setelah memuat data kapal
    }, error => console.error('Failed to load ships:', error));
  }
  // Menangani pemilihan zona poligon
  onPolygonZoneSelected(zone) {
    this.currentSelectedPolygonZone = zone;
    this.updateShipCountInZone(zone, 'polygon');
  }
  // Menangani pemilihan zona lingkaran
  onCircleZoneSelected(zone) {
    this.currentSelectedCircleZone = zone;
    this.updateShipCountInZone(zone, 'circle');
  }
  // Memperbarui jumlah kapal di semua zona
  updateAllZoneCounts() {
    this.polygonZones.forEach(zone => {
      this.polygonShipCounts[zone._id] = this.ships.filter(ship => this.polygonZoneHandler.isShipInZone(ship, zone)).length;
    });
    this.circleZones.forEach(zone => {
      this.circleShipCounts[zone._id] = this.ships.filter(ship => this.circleZoneHandler.isShipInZone(ship, zone)).length;
    });
  }
  // Memperbarui jumlah kapal di zona yang dipilih
  updateShipCountInZone(zone, type) {
    if (!zone || !this.ships.length) return;
    const count = this.ships.filter(ship => this.isShipInZone(ship, zone, type)).length;
    if (type === 'polygon') {
      this.polygonShipCounts[zone._id] = count;
    } else if (type === 'circle') {
      this.circleShipCounts[zone._id] = count;
    }
  }
  // Memeriksa apakah kapal berada dalam zona tertentu (poligon atau lingkaran)
  isShipInZone(ship, zone, type) {
    if (type === 'circle') {
      return this.circleZoneHandler.isShipInZone(ship, zone);
    } else if (type === 'polygon') {
      return this.polygonZoneHandler.isShipInZone(ship, zone);
    }
    return false;
  }
  static #_ = this.ɵfac = function MainComponent_Factory(t) {
    return new (t || MainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_0__.PolygonZoneHandler), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_circle_zone_handler__WEBPACK_IMPORTED_MODULE_1__.CircleZoneHandler), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_service__WEBPACK_IMPORTED_MODULE_2__.DataService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: MainComponent,
    selectors: [["app-main"]],
    decls: 30,
    vars: 4,
    consts: [[1, "row", "mt-4"], [1, "col-lg-6", "col-md-6", "mt-4", "mb-4"], [1, "card", "z-index-2"], [1, "card-header", "p-0", "position-relative", "mt-n4", "mx-3", "z-index-2", "bg-transparent"], [1, "cardmain", "active", "bg-gradient-primary", "shadow-primary", "border-radius-lg", "py-3", "pe-1", "text-center", "align-items-center", 2, "height", "200px"], [1, "fas", "fa-draw-polygon", "fs-1", 2, "color", "white"], [1, "mb-0", "fs-3", 2, "color", "white"], [1, "text-white", "mb-0", "fs-5"], ["appearance", "fill", 2, "width", "100%"], [2, "color", "black"], [3, "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "cardmain2", "active", "bg-gradient-primary", "shadow-primary", "border-radius-lg", "py-3", "pe-1", "text-center", "align-items-center", 2, "height", "200px"], [1, "fas", "fa-circle-notch", "fs-1", 2, "color", "white"], [1, "text-white", "mb-0", "fs-5", 2, "color", "black"], [3, "value"]],
    template: function MainComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "h1", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Polygon Zone");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "h4", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "mat-form-field", 8)(11, "mat-label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Select a polygon zone");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "mat-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectionChange", function MainComponent_Template_mat_select_selectionChange_13_listener($event) {
          return ctx.onPolygonZoneSelected($event.value);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, MainComponent_mat_option_14_Template, 2, 2, "mat-option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 1)(16, "div", 2)(17, "div", 3)(18, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "h1", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Circle Zone");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "h4", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "mat-form-field", 8)(25, "mat-label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, "Select a circle zone");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "mat-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectionChange", function MainComponent_Template_mat_select_selectionChange_27_listener($event) {
          return ctx.onCircleZoneSelected($event.value);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](28, MainComponent_mat_option_28_Template, 2, 2, "mat-option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](29, "app-leaflet-map");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Ships in zone: ", ctx.polygonShipCounts[ctx.currentSelectedPolygonZone == null ? null : ctx.currentSelectedPolygonZone._id] || 0, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.polygonZones);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Ships in zone: ", ctx.circleShipCounts[ctx.currentSelectedCircleZone == null ? null : ctx.currentSelectedCircleZone._id] || 0, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.circleZones);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_7__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatOption, _leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_3__.LeafletMapComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 88986:
/*!**********************************************!*\
  !*** ./src/app/main/polygon-zone-handler.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PolygonZoneHandler: () => (/* binding */ PolygonZoneHandler)
/* harmony export */ });
/* harmony import */ var _turf_turf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/turf */ 40516);
/* harmony import */ var _turf_turf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/turf */ 79042);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 79736);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_polygon_zone_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/polygon-zone.service */ 49105);




class PolygonZoneHandler {
  constructor(polygonZoneService) {
    this.polygonZoneService = polygonZoneService;
  }
  loadPolygonZones() {
    return this.polygonZoneService.getPolygonZones().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(data => data.map(zone => {
      if (!zone.coordinates || zone.coordinates.length === 0) return null;
      let coordinates = zone.coordinates[0].map(coord => {
        if (coord && typeof coord.lat === 'number' && typeof coord.lng === 'number') {
          return [coord.lng, coord.lat];
        }
        return null;
      }).filter(coord => coord !== null);
      if (coordinates.length >= 3 && coordinates[0] !== coordinates[coordinates.length - 1]) {
        coordinates.push(coordinates[0]);
      }
      if (coordinates.length < 4) return null;
      return {
        ...zone,
        coordinates: [coordinates]
      };
    }).filter(zone => zone !== null)));
  }
  isShipInZone(ship, zone) {
    try {
      const point = _turf_turf__WEBPACK_IMPORTED_MODULE_2__.point([ship.lon, ship.lat]);
      const polygon = _turf_turf__WEBPACK_IMPORTED_MODULE_2__.polygon(zone.coordinates);
      return _turf_turf__WEBPACK_IMPORTED_MODULE_3__.booleanPointInPolygon(point, polygon);
    } catch (error) {
      console.error('Failed to create polygon or check ship in zone', error);
      return false;
    }
  }
  static #_ = this.ɵfac = function PolygonZoneHandler_Factory(t) {
    return new (t || PolygonZoneHandler)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_polygon_zone_service__WEBPACK_IMPORTED_MODULE_0__.PolygonZoneService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: PolygonZoneHandler,
    factory: PolygonZoneHandler.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 73633:
/*!****************************************************!*\
  !*** ./src/app/mainlayout/mainlayout.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainlayoutComponent: () => (/* binding */ MainlayoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../navbar/navbar.component */ 92247);
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sidebar/sidebar.component */ 22711);
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../footer/footer.component */ 36515);





class MainlayoutComponent {
  static #_ = this.ɵfac = function MainlayoutComponent_Factory(t) {
    return new (t || MainlayoutComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: MainlayoutComponent,
    selectors: [["app-mainlayout"]],
    decls: 7,
    vars: 0,
    consts: [["id", "sidenav-main", 1, "sidenav", "navbar", "navbar-vertical", "navbar-expand-xs", "border-0", "border-radius-xl", "my-3", "fixed-start", "ms-3", "bg-gradient-dark"], [1, "main-content", "position-relative", "max-height-vh-100", "h-100", "border-radius-lg"]],
    template: function MainlayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "aside", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-sidebar");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "main", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "app-navbar")(4, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__.NavbarComponent, _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_1__.SidebarComponent, _footer_footer_component__WEBPACK_IMPORTED_MODULE_2__.FooterComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 92247:
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavbarComponent: () => (/* binding */ NavbarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/notification.service */ 36896);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.service */ 42266);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ 32333);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _uiconfigurator_uiconfigurator_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uiconfigurator/uiconfigurator.component */ 99133);







function NavbarComponent_li_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li")(1, "a", 35)(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](notification_r1.timestamp);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](": ", notification_r1.message, " ");
  }
}
class NavbarComponent {
  constructor(notificationService, appService, authService, router) {
    this.notificationService = notificationService;
    this.appService = appService;
    this.authService = authService;
    this.router = router;
    this.notifications = [];
    this.userName = ''; // Nama pengguna untuk ditampilkan
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
    this.userName = this.authService.getUserName();
  }
  callToggleSidenav() {
    // Panggil fungsi toggleSidenav dengan id "sidenav-main"
    return this.appService.callToggleSidenav();
  }
  get isPluginVisible() {
    return this.appService.getIsPluginVisible();
  }
  togglePluginVisibility() {
    this.appService.togglePluginVisibility();
  }
  closeFixedPlugin() {
    this.appService.closeFixedPlugin();
  }
  static #_ = this.ɵfac = function NavbarComponent_Factory(t) {
    return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_notification_service__WEBPACK_IMPORTED_MODULE_0__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_service__WEBPACK_IMPORTED_MODULE_1__.AppService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: NavbarComponent,
    selectors: [["app-navbar"]],
    decls: 52,
    vars: 5,
    consts: [["id", "navbarBlur", "data-scroll", "true", 1, "navbar", "navbar-main", "navbar-expand-lg", "px-0", "mx-4", "shadow-none", "border-radius-xl"], [1, "container-fluid", "py-1", "px-3"], ["aria-label", "breadcrumb"], [1, "breadcrumb", "bg-transparent", "mb-0", "pb-0", "pt-1", "px-0", "me-sm-6", "me-5"], [1, "breadcrumb-item", "text-sm"], ["href", "javascript:;", 1, "opacity-5", "text-dark"], ["aria-current", "page", 1, "breadcrumb-item", "text-sm", "text-dark", "active"], [1, "font-weight-bolder", "mb-0"], ["id", "navbar", 1, "collapse", "navbar-collapse", "mt-sm-0", "mt-2", "me-md-0", "me-sm-4"], [1, "navbar-nav", "ms-auto"], [1, "nav-item", "px-3", "d-flex", "align-items-center"], [1, "nav-link", "text-body", "p-0"], ["href", "javascript:;", 1, "nav-link", "text-body", "p-0", 3, "click"], [1, "fa", "fa-sign-out", "cursor-pointer"], [1, "fa", "fa-cog", "fixed-plugin-button-nav", "cursor-pointer"], [1, "fixed-plugin"], [1, "fixed-plugin-button", "text-dark", "position-fixed", "px-3", "py-2", 3, "click"], [1, "material-icons", "py-2"], [1, "card", "shadow-lg"], [1, "card-header", "pb-0", "pt-3"], [1, "float-start"], [1, "mt-3", "mb-0"], [1, "float-end", "mt-4"], [1, "btn", "btn-link", "text-dark", "p-0", "fixed-plugin-close-button", 3, "click"], [1, "material-icons"], [1, "nav-item", "dropdown", "pe-2", "d-flex", "align-items-center"], ["href", "javascript:;", "id", "dropdownMenuButton", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "nav-link", "text-body", "p-0"], [1, "fa", "fa-bell", "cursor-pointer"], [1, "badge", "badge-pill", "bg-danger"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu", "dropdown-menu-end", "px-2", "py-3", "me-sm-n4"], [4, "ngFor", "ngForOf"], [1, "nav-item", "d-xl-none", "ps-3", "d-flex", "align-items-center"], ["href", "javascript:;", "id", "iconNavbarSidenav", 1, "nav-link", "text-body", "p-0", 3, "click"], [1, "sidenav-toggler-inner"], [1, "sidenav-toggler-line"], [1, "dropdown-item"]],
    template: function NavbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "nav", 0)(1, "div", 1)(2, "nav", 2)(3, "ol", 3)(4, "li", 4)(5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Pages");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, " Dashboard ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "h6", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 8)(12, "ul", 9)(13, "li", 10)(14, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "li", 10)(17, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_17_listener() {
          return ctx.logout();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, " Logout ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "li", 10)(21, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_21_listener() {
          return ctx.togglePluginVisibility();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](22, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "div", 15)(24, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_24_listener() {
          return ctx.togglePluginVisibility();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, "settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "div", 18)(28, "div", 19)(29, "div", 20)(30, "h5", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "Material UI Configurator");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, "See our dashboard options.");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "div", 22)(35, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NavbarComponent_Template_button_click_35_listener() {
          return ctx.closeFixedPlugin();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](38, "app-uiconfigurator");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "li", 25)(40, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](41, "i", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "span", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "ul", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](45, NavbarComponent_li_45_Template, 5, 2, "li", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "li", 31)(47, "a", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_47_listener() {
          return ctx.callToggleSidenav();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](49, "i", 34)(50, "i", 34)(51, "i", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Halo, ", ctx.userName, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("show", ctx.isPluginVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.notifications.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.notifications);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _uiconfigurator_uiconfigurator_component__WEBPACK_IMPORTED_MODULE_3__.UiconfiguratorComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 32644:
/*!************************************************!*\
  !*** ./src/app/newfitur/newfitur.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewfiturComponent: () => (/* binding */ NewfiturComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/main.component */ 26542);


class NewfiturComponent {
  static #_ = this.ɵfac = function NewfiturComponent_Factory(t) {
    return new (t || NewfiturComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: NewfiturComponent,
    selectors: [["app-newfitur"]],
    decls: 1,
    vars: 0,
    template: function NewfiturComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-main");
      }
    },
    dependencies: [_main_main_component__WEBPACK_IMPORTED_MODULE_0__.MainComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 16878:
/*!********************************************************!*\
  !*** ./src/app/notification/notification.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationComponent: () => (/* binding */ NotificationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/notification.service */ 36896);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 90895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 86515);





function NotificationComponent_li_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 6)(1, "div", 7)(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NotificationComponent_li_6_Template_button_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const notification_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.deleteNotification(notification_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](4, 2, notification_r1.timestamp, "short"), ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", notification_r1.message, " ");
  }
}
class NotificationComponent {
  constructor(notificationService) {
    this.notificationService = notificationService;
    this.notifications = [];
  }
  ngOnInit() {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }
  deleteNotification(notification) {
    this.notificationService.deleteNotification(notification);
  }
  static #_ = this.ɵfac = function NotificationComponent_Factory(t) {
    return new (t || NotificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_notification_service__WEBPACK_IMPORTED_MODULE_0__.NotificationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: NotificationComponent,
    selectors: [["app-notification"]],
    decls: 7,
    vars: 1,
    consts: [[1, "container"], [1, "row"], [1, "col-12"], [2, "color", "#fff"], [1, "notification-list"], ["class", "notification-item", 4, "ngFor", "ngForOf"], [1, "notification-item"], [1, "notification-content"], ["mat-icon-button", "", "matTooltip", "Delete", 1, "delete-button", 3, "click"]],
    template: function NotificationComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ul", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, NotificationComponent_li_6_Template, 9, 5, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.notifications);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DatePipe],
    styles: [".container[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n\n.notification-list[_ngcontent-%COMP%] {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n\n.notification-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #333;\n  color: #fff;\n  padding: 12px;\n  margin-bottom: 8px;\n  border-radius: 4px;\n}\n\n.notification-content[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n\n.delete-button[_ngcontent-%COMP%] {\n  color: #f44336;\n  opacity: 0.7;\n  transition: opacity 0.3s;\n}\n\n.delete-button[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsV0FBVztFQUNYLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztFQUNkLFlBQVk7RUFDWix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxVQUFVO0FBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLWxpc3Qge1xyXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG5cclxuLm5vdGlmaWNhdGlvbi1pdGVtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgcGFkZGluZzogMTJweDtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcblxyXG4ubm90aWZpY2F0aW9uLWNvbnRlbnQge1xyXG4gIGZsZXgtZ3JvdzogMTtcclxufVxyXG5cclxuLmRlbGV0ZS1idXR0b24ge1xyXG4gIGNvbG9yOiAjZjQ0MzM2O1xyXG4gIG9wYWNpdHk6IDAuNztcclxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3M7XHJcbn1cclxuXHJcbi5kZWxldGUtYnV0dG9uOmhvdmVyIHtcclxuICBvcGFjaXR5OiAxO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 22844:
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterComponent: () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 32333);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);





function RegisterComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.successMessage, " ");
  }
}
function RegisterComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.errorMessage, " ");
  }
}
class RegisterComponent {
  constructor(authService) {
    this.authService = authService;
    this.username = '';
    this.email = '';
    this.role = 'user'; // Default role
    this.password = '';
    this.successMessage = '';
    this.errorMessage = '';
  }
  register() {
    const userData = {
      username: this.username,
      email: this.email,
      role: this.role,
      password: this.password
    };
    console.log("Data yang dikirim:", JSON.stringify(userData)); // Debugging data
    this.authService.register(userData).subscribe(response => {
      console.log('Registration successful', response);
      this.successMessage = 'Registration successful!';
      this.errorMessage = ''; // Clear error message if any
      // Tambahkan logika setelah pendaftaran berhasil, seperti navigasi ke halaman lain
    }, error => {
      this.errorMessage = 'Registration failed! Please try again.';
      this.successMessage = ''; // Clear success message if any
      console.error('Registration failed', error);
    });
  }
  static #_ = this.ɵfac = function RegisterComponent_Factory(t) {
    return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: RegisterComponent,
    selectors: [["app-register"]],
    decls: 37,
    vars: 5,
    consts: [[1, "container", "position-sticky", "z-index-sticky", "top-0"], [1, "row"], [1, "col-12"], [1, "main-content", "mt-0"], [1, "page-header", "align-items-start", "min-vh-100", 2, "background-image", "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')"], [1, "mask", "bg-gradient-dark", "opacity-6"], [1, "container", "my-auto"], [1, "col-lg-4", "col-md-8", "col-12", "mx-auto"], [1, "card", "z-index-0", "fadeIn3", "fadeInBottom"], [1, "card-header", "p-0", "position-relative", "mt-n4", "mx-3", "z-index-2"], [1, "bg-gradient-primary", "shadow-primary", "border-radius-lg", "py-3", "pe-1"], [1, "text-white", "font-weight-bolder", "text-center", "mt-2", "mb-0"], [1, "card-body"], ["role", "form", 1, "text-start", 3, "ngSubmit"], [1, "input-group", "input-group-outline", "my-3"], [1, "form-label"], ["type", "text", "name", "username", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "email", "name", "email", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "input-group", "input-group-outline", "mb-3"], ["type", "password", "name", "password", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "text-center"], ["type", "submit", 1, "btn", "bg-gradient-primary", "w-100", "my-4", "mb-2"], [1, "mt-4", "text-sm", "text-center"], ["routerLink", "/login", 1, "text-primary", "text-gradient", "font-weight-bold"], ["class", "alert alert-success", "role", "alert", 4, "ngIf"], ["class", "alert alert-danger", "role", "alert", 4, "ngIf"], ["role", "alert", 1, "alert", "alert-success"], ["role", "alert", 1, "alert", "alert-danger"]],
    template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "main", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 6)(7, "div", 1)(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "div", 10)(12, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Register AIS Monitoring");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 12)(15, "form", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_15_listener() {
          return ctx.register();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 14)(17, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_19_listener($event) {
          return ctx.username = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 14)(21, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_23_listener($event) {
          return ctx.email = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 18)(25, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_27_listener($event) {
          return ctx.password = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 20)(29, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Sign up");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "p", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, " Already have an account? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Sign in");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, RegisterComponent_div_35_Template, 2, 1, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, RegisterComponent_div_36_Template, 2, 1, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.successMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.errorMessage);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 25662:
/*!****************************************************!*\
  !*** ./src/app/services/add-coordinate.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoordinateControlService: () => (/* binding */ CoordinateControlService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ 27889);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);


class CoordinateControlService {
  constructor() {
    this.trackCursor = false; // Flag to toggle between center and cursor tracking
  }
  // Method to add the coordinate control to the map
  addCoordinateControl(map) {
    const coordinateCardTemplate = `
      <div class="coordinate-card">
        <div class="coordinate-card-header">Map Coordinates</div>
        <div class="coordinate-card-body">
          <div class="toggle-slider-container">
            <label class="switch">
              <input type="checkbox" id="coordinate-toggle">
              <span class="slider"></span>
            </label>
            <span class="toggle-label" id="toggle-label">Center</span>
          </div>
          <div id="coordinate-info">
            <div><strong>Decimal Coordinates:</strong></div>
            <div>Lat: <span id="lat-decimal">0.00000</span>, Lng: <span id="lng-decimal">0.00000</span></div>
            <div><strong>DMS Coordinates:</strong></div>
            <div>Lat: <span id="lat-dms">0° 0' 0" N</span>, Lng: <span id="lng-dms">0° 0' 0" E</span></div>
          </div>
        </div>
      </div>
    `;
    const CoordinateControl = leaflet__WEBPACK_IMPORTED_MODULE_0__.Control.extend({
      onAdd: () => {
        const div = leaflet__WEBPACK_IMPORTED_MODULE_0__.DomUtil.create('div', 'leaflet-coordinate-display');
        div.innerHTML = coordinateCardTemplate;
        this.applyInlineStyles(div);
        this.setupSliderToggle(div, map);
        return div;
      }
    });
    this.coordinateControl = new CoordinateControl({
      position: 'bottomleft'
    });
    if (this.coordinateControl) {
      this.coordinateControl.addTo(map);
      map.on('move', () => this.updateCoordinates(map));
      map.on('mousemove', event => {
        if (this.trackCursor) {
          this.updateCoordinates(map, event.latlng);
        }
      });
      map.on('dblclick', event => this.lockCoordinates(map, event.latlng));
    }
  }
  // Method to lock coordinates on double-click and display a marker with a SweetAlert popup
  lockCoordinates(map, latlng) {
    // Remove the previous marker if it exists
    if (this.lockedMarker) {
      map.removeLayer(this.lockedMarker);
    }
    // Add a marker at the clicked position
    this.lockedMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(latlng).addTo(map);
    // Show a SweetAlert popup with the coordinates
    sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
      title: 'Coordinates Locked',
      html: `
        <div><strong>Decimal Coordinates:</strong></div>
        <div>Lat: ${latlng.lat.toFixed(5)}, Lng: ${latlng.lng.toFixed(5)}</div>
        <div><strong>DMS Coordinates:</strong></div>
        <div>Lat: ${this.convertToDMS(latlng.lat)}, Lng: ${this.convertToDMS(latlng.lng)}</div>
      `,
      confirmButtonText: 'OK'
    });
    // Update the coordinate display with the locked location
    this.updateCoordinates(map, latlng);
  }
  // Method to set up the slider toggle for center/cursor coordinate tracking
  setupSliderToggle(div, map) {
    const toggleInput = div.querySelector('#coordinate-toggle');
    const toggleLabel = div.querySelector('#toggle-label');
    toggleInput.addEventListener('change', () => {
      this.trackCursor = toggleInput.checked;
      toggleLabel.innerText = this.trackCursor ? 'Cursor' : 'Center';
      // Remove marker if center mode is active
      if (!this.trackCursor && this.lockedMarker) {
        map.removeLayer(this.lockedMarker);
        this.lockedMarker = undefined;
      }
      this.updateCoordinates(map); // Update coordinates to show the correct mode immediately
    });
  }
  // Method to update the coordinates on the control based on either map center or cursor position
  updateCoordinates(map, cursorLatLng) {
    const latDecimalElement = document.getElementById('lat-decimal');
    const lngDecimalElement = document.getElementById('lng-decimal');
    const latDMSElement = document.getElementById('lat-dms');
    const lngDMSElement = document.getElementById('lng-dms');
    const latLng = cursorLatLng || map.getCenter(); // Use cursor position if tracking, otherwise map center
    if (latDecimalElement && lngDecimalElement && latDMSElement && lngDMSElement) {
      latDecimalElement.innerText = latLng.lat.toFixed(5);
      lngDecimalElement.innerText = latLng.lng.toFixed(5);
      latDMSElement.innerText = this.convertToDMS(latLng.lat);
      lngDMSElement.innerText = this.convertToDMS(latLng.lng);
    }
  }
  // Function to convert decimal coordinates to DMS (Degrees, Minutes, Seconds) format
  convertToDMS(coordinate) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    const direction = coordinate >= 0 ? coordinate === absolute ? 'N' : 'E' : coordinate === absolute ? 'S' : 'W';
    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  }
  // Apply inline styles to the coordinate card and the slider toggle
  applyInlineStyles(div) {
    div.style.backgroundColor = 'rgba(161, 154, 154, 0)'; // Semi-transparent background
    div.style.color = '#000'; // Black text for readability
    div.style.borderRadius = '8px';
    div.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';
    div.style.width = '250px';
    div.style.overflow = 'hidden';
    div.style.margin = '5px';
    div.style.position = 'absolute';
    div.style.bottom = '15px';
    div.style.left = '15px';
    const header = div.querySelector('.coordinate-card-header');
    if (header) {
      header.style.backgroundColor = 'rgba(161, 154, 154, 0)';
      header.style.color = 'black';
      header.style.padding = '8px';
      header.style.fontWeight = 'bold';
      header.style.textAlign = 'center';
    }
    const body = div.querySelector('.coordinate-card-body');
    const coordinateLines = body.querySelectorAll('div');
    coordinateLines.forEach(line => {
      line.style.marginBottom = '4px'; // Add spacing between lines for clearer layout
    });
    // Style for the slider toggle
    const sliderStyle = document.createElement('style');
    sliderStyle.innerHTML = `
      .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
      }
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }
      input:checked + .slider {
        background-color: #007bff;
      }
      input:checked + .slider:before {
        transform: translateX(26px);
      }
      .toggle-label {
        margin-left: 10px;
        font-size: 14px;
        color: #000;
      }
    `;
    document.head.appendChild(sliderStyle);
  }
}

/***/ }),

/***/ 32333:
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 54860);


class AuthService {
  constructor(http) {
    this.http = http;
    this.apiUrl = 'http://165.154.208.232:3000/api'; // Sesuaikan dengan URL backend Anda
  }

  register(userData) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  login(credentials) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    return !!localStorage.getItem('token'); // Mengembalikan true jika token ada di localStorage
  }

  getUserName() {
    return localStorage.getItem('userName') || '';
  }
  saveUserName(userName) {
    localStorage.setItem('userName', userName);
  }
  static #_ = this.ɵfac = function AuthService_Factory(t) {
    return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: AuthService,
    factory: AuthService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 23219:
/*!************************************************!*\
  !*** ./src/app/services/base-layer.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseLayerService: () => (/* binding */ BaseLayerService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);

class BaseLayerService {
  static #_ = this.baseLayers = {
    'OpenStreetMap': leaflet__WEBPACK_IMPORTED_MODULE_0__.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }),
    'Esri World Street Map': leaflet__WEBPACK_IMPORTED_MODULE_0__.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 20,
      attribution: '... Esri &mdash; Esri, DeLorme, NAVTEQ'
    }),
    'Ocean': leaflet__WEBPACK_IMPORTED_MODULE_0__.tileLayer('https://api.maptiler.com/maps/ocean/{z}/{x}/{y}.png?key=TLRSpsp0lyuC33gmLrBu', {
      maxZoom: 20,
      attribution: '&copy; MapTiler'
    }),
    'Satelite': leaflet__WEBPACK_IMPORTED_MODULE_0__.tileLayer('https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}@2x.jpg?key=GDfjtnu7IHfNAGwlcHjN', {
      maxZoom: 20,
      attribution: '&copy; MapTiler'
    })
  };
}
;

/***/ }),

/***/ 23133:
/*!*************************************************!*\
  !*** ./src/app/services/circle-zone-handler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CircleZoneHandler: () => (/* binding */ CircleZoneHandler)
/* harmony export */ });
/* harmony import */ var _turf_turf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/turf */ 25696);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 79736);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_circle_zone_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/circle-zone.service */ 20251);




class CircleZoneHandler {
  constructor(circleZoneService) {
    this.circleZoneService = circleZoneService;
  }
  // Metode untuk memuat zona lingkaran dari layanan CircleZoneService
  loadCircleZones() {
    return this.circleZoneService.getCircleZones().pipe(
    // Memproses data yang diterima dari layanan
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(data => data.map(zone => {
      // Periksa apakah koordinat dan radius ada dan valid
      if (!zone.coordinates || typeof zone.coordinates.radius !== 'number') return null;
      if (typeof zone.coordinates.lat !== 'number' || typeof zone.coordinates.lng !== 'number') return null;
      // Kembalikan zona dengan struktur yang diubah
      return {
        ...zone,
        center: {
          lat: zone.coordinates.lat,
          lng: zone.coordinates.lng
        },
        radius: zone.coordinates.radius // Set radius lingkaran
      };
    }).filter(zone => zone !== null)) // Hapus zona yang tidak valid
    );
  }
  // Metode untuk memeriksa apakah kapal berada dalam zona lingkaran
  isShipInZone(ship, zone) {
    // Hitung jarak antara kapal dan pusat lingkaran menggunakan turf.js
    const distance = _turf_turf__WEBPACK_IMPORTED_MODULE_2__.distance([ship.lon, ship.lat], [zone.center.lng, zone.center.lat], {
      units: 'meters'
    });
    return distance <= zone.radius; // Periksa apakah jarak kurang dari atau sama dengan radius lingkaran
  }
  static #_ = this.ɵfac = function CircleZoneHandler_Factory(t) {
    return new (t || CircleZoneHandler)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_services_circle_zone_service__WEBPACK_IMPORTED_MODULE_0__.CircleZoneService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: CircleZoneHandler,
    factory: CircleZoneHandler.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 20251:
/*!*************************************************!*\
  !*** ./src/app/services/circle-zone.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CircleZoneService: () => (/* binding */ CircleZoneService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 54860);


class CircleZoneService {
  constructor(http) {
    this.http = http;
    this.apiUrl = 'http://165.154.208.232:3000/api/shapes/circle'; // Update this URL as per your API endpoint
  }

  getCircleZones() {
    return this.http.get(this.apiUrl);
  }
  static #_ = this.ɵfac = function CircleZoneService_Factory(t) {
    return new (t || CircleZoneService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: CircleZoneService,
    factory: CircleZoneService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 37794:
/*!**************************************************!*\
  !*** ./src/app/services/draw-control.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawControlService: () => (/* binding */ DrawControlService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _shape_data_handler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shape-data-handler.service */ 43107);
/* harmony import */ var _shapeService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shapeService */ 128);




class DrawControlService {
  constructor(shapeDataHandler, shapeService) {
    this.shapeDataHandler = shapeDataHandler;
    this.shapeService = shapeService;
  }
  static createDrawControl(drawnItems) {
    return new leaflet__WEBPACK_IMPORTED_MODULE_0__.Control.Draw({
      edit: {
        featureGroup: drawnItems
      },
      draw: {
        circle: {
          shapeOptions: {
            color: '#0000FF'
          }
        },
        polygon: {},
        rectangle: false,
        polyline: false,
        marker: false,
        circlemarker: false
      }
    });
  }
  handleDrawEvents(map, drawnItems) {
    map.on(leaflet__WEBPACK_IMPORTED_MODULE_0__.Draw.Event.CREATED, event => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
      this.shapeDataHandler.promptForLayerData(layer);
      // MapUtilities.saveDrawnItems(drawnItems);
    });

    map.on(leaflet__WEBPACK_IMPORTED_MODULE_0__.Draw.Event.DELETED, event => {
      const layers = event.layers;
      layers.eachLayer(layer => {
        if (layer.shapeId) {
          this.shapeService.deleteShape(layer.shapeId).subscribe({
            next: res => console.log('Shape deleted from server', res),
            error: err => {
              console.error('Error deleting shape', err);
              alert('Failed to delete shape: ' + err.message); // Display or handle error more visibly
            }
          });
        }
      });
    });
  }

  loadShapes(map, drawnItems) {
    this.shapeService.getShapes().subscribe(shapes => {
      shapes.forEach(shape => {
        let layer;
        if (shape.type === 'circle') {
          layer = leaflet__WEBPACK_IMPORTED_MODULE_0__.circle([shape.coordinates.lat, shape.coordinates.lng], {
            radius: shape.coordinates.radius,
            color: shape.properties.color
          });
        } else if (shape.type === 'polygon') {
          layer = leaflet__WEBPACK_IMPORTED_MODULE_0__.polygon(shape.coordinates, {
            color: shape.properties.color
          });
        }
        if (layer) {
          layer.addTo(drawnItems);
          this.bindPopupToLayer(layer, shape.properties.mmsi, shape.properties.name, shape.properties.status, shape.properties.description, shape.coordinates);
          layer.shapeId = shape._id; // Ensure shapeId is set here if not done yet
        }
      });
    }, error => console.error('Error loading shapes:', error));
  }
  bindPopupToLayer(layer, mmsi, name, status, description, coordinates) {
    let content = `<div><strong>Name:</strong> ${name}</div>
                   <div><strong>Status:</strong> ${status}</div>
                   <div><strong>Description:</strong> ${description}</div>`;
    if (layer instanceof leaflet__WEBPACK_IMPORTED_MODULE_0__.Circle) {
      content += `<div><strong>Coordinates:</strong> ${coordinates.lat}, ${coordinates.lng}</div>`;
    } else if (layer instanceof leaflet__WEBPACK_IMPORTED_MODULE_0__.Polygon) {
      content += `<div><strong>Coordinates:</strong><ul>`;
      coordinates.forEach(latlngs => {
        latlngs.forEach(latlng => {
          content += `<li>${latlng.lat}, ${latlng.lng}</li>`;
        });
      });
      content += `</ul></div>`;
    }
    layer.bindPopup(content).openPopup();
  }
  static #_ = this.ɵfac = function DrawControlService_Factory(t) {
    return new (t || DrawControlService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_shape_data_handler_service__WEBPACK_IMPORTED_MODULE_1__.ShapeDataHandlerService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_shapeService__WEBPACK_IMPORTED_MODULE_2__.ShapeService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: DrawControlService,
    factory: DrawControlService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 48484:
/*!*********************************************!*\
  !*** ./src/app/services/heatmap.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeatmapService: () => (/* binding */ HeatmapService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
// heatmap.service.ts


class HeatmapService {
  constructor() {}
  addHeatMap(map, data) {
    if (this.heatmapLayer) {
      map.removeLayer(this.heatmapLayer);
    }
    const heatData = data.map(ship => [ship.lat, ship.lon, 1.0]);
    this.heatmapLayer = leaflet__WEBPACK_IMPORTED_MODULE_0__.heatLayer(heatData, {
      radius: 35,
      blur: 15,
      maxZoom: 17
    }).addTo(map);
  }
  static #_ = this.ɵfac = function HeatmapService_Factory(t) {
    return new (t || HeatmapService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: HeatmapService,
    factory: HeatmapService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 86671:
/*!******************************************!*\
  !*** ./src/app/services/icon.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconService: () => (/* binding */ IconService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);

class IconService {
  static #_ = this.shipIcons = {
    'Unspecified': leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
      iconUrl: 'assets/images/unspecified.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Fishing': leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
      iconUrl: 'assets/images/fishing.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Tanker': leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
      iconUrl: 'assets/images/tanker.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Cargo': leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
      iconUrl: 'assets/images/cargo.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Tug': leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
      iconUrl: 'assets/images/tug.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Highspeed': leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
      iconUrl: 'assets/images/highspeed.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Passenger': leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
      iconUrl: 'assets/images/passenger.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Pleasure': leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
      iconUrl: 'assets/images/pleasure.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })
  };
  static getIconForShipType(type) {
    if (type >= 20 && type <= 29) {
      return this.shipIcons['Cargo'];
    } else if (type >= 30 && type <= 39) {
      if (type === 30) {
        return this.shipIcons['Fishing'];
      } else if (type === 31 || type === 32) {
        return this.shipIcons['Tug'];
      } else if (type === 36) {
        return this.shipIcons['Pleasure'];
      } else {
        return this.shipIcons['Unspecified'];
      }
    } else if (type >= 40 && type <= 59) {
      return this.shipIcons['Highspeed'];
    } else if (type >= 60 && type <= 69) {
      return this.shipIcons['Passenger'];
    } else if (type >= 70 && type <= 79) {
      return this.shipIcons['Cargo'];
    } else if (type >= 80 && type <= 89) {
      return this.shipIcons['Tanker'];
    } else if (type >= 90 && type <= 99) {
      return this.shipIcons['Unspecified'];
    } else {
      return this.shipIcons['Unspecified'];
    }
  }
}

/***/ }),

/***/ 88540:
/*!*****************************************!*\
  !*** ./src/app/services/map.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MapService: () => (/* binding */ MapService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var leaflet_draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet-draw */ 26564);
/* harmony import */ var leaflet_draw__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_draw__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_fullscreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet.fullscreen */ 8848);
/* harmony import */ var leaflet_fullscreen__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet_fullscreen__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var leaflet_heat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet.heat */ 47239);
/* harmony import */ var leaflet_heat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet_heat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base_layer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base-layer.service */ 23219);
/* harmony import */ var _draw_control_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./draw-control.service */ 37794);
/* harmony import */ var moment_duration_format__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment-duration-format */ 64436);
/* harmony import */ var moment_duration_format__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment_duration_format__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _add_coordinate_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-coordinate.service */ 25662);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _searchcontrol_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./searchcontrol.service */ 77565);
/* harmony import */ var _shape_data_handler_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shape-data-handler.service */ 43107);
/* harmony import */ var _playback_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./playback.service */ 72381);













class MapService {
  constructor(drawControlService, searchControlService,
  // Inject the SearchControlService
  shapeDataHandlerService, playbackService) {
    this.drawControlService = drawControlService;
    this.searchControlService = searchControlService;
    this.shapeDataHandlerService = shapeDataHandlerService;
    this.playbackService = playbackService;
    this.drawnItems = new leaflet__WEBPACK_IMPORTED_MODULE_0__.FeatureGroup();
    this.coordinateControlService = new _add_coordinate_service__WEBPACK_IMPORTED_MODULE_7__.CoordinateControlService(); // Initialize CoordinateControlService
  }

  initializeMap(containerId) {
    this.map = leaflet__WEBPACK_IMPORTED_MODULE_0__.map(containerId, {
      center: [-7.18643057415128, 112.71902662227242],
      zoom: 8,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topright'
      }
    });
    this.addBaseLayers();
    this.map.addLayer(this.drawnItems);
    this.setupDrawControl();
    this.playbackService.initializePlayback(this.map);
    // Add the coordinate control and search control to the map
    this.coordinateControlService.addCoordinateControl(this.map);
    this.searchControlService.addSearchControl(this.map, this.focusOnShip.bind(this));
    this.drawControlService.loadShapes(this.map, this.drawnItems);
    return this.map;
  }
  addBaseLayers() {
    const defaultLayer = _base_layer_service__WEBPACK_IMPORTED_MODULE_4__.BaseLayerService.baseLayers['Ocean'];
    defaultLayer.addTo(this.map);
    this.layersControl = leaflet__WEBPACK_IMPORTED_MODULE_0__.control.layers(_base_layer_service__WEBPACK_IMPORTED_MODULE_4__.BaseLayerService.baseLayers).addTo(this.map);
  }
  setupDrawControl() {
    const drawControl = _draw_control_service__WEBPACK_IMPORTED_MODULE_5__.DrawControlService.createDrawControl(this.drawnItems);
    this.map.addControl(drawControl);
    // Listen for drawing events to trigger the SweetAlert popup
    this.map.on(leaflet__WEBPACK_IMPORTED_MODULE_0__.Draw.Event.CREATED, event => {
      const layer = event.layer;
      this.drawnItems.addLayer(layer);
      // Trigger the SweetAlert popup using ShapeDataHandlerService
      this.shapeDataHandlerService.promptForLayerData(layer);
    });
  }
  focusOnShip(ship) {
    this.map.setView([ship.lat, ship.lon], 18);
  }
  // In map.service.ts
  getMapInstance() {
    return this.map;
  }
  destroyMap() {
    this.map.remove();
  }
  static #_ = this.ɵfac = function MapService_Factory(t) {
    return new (t || MapService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_draw_control_service__WEBPACK_IMPORTED_MODULE_5__.DrawControlService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_searchcontrol_service__WEBPACK_IMPORTED_MODULE_8__.SearchControlService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_shape_data_handler_service__WEBPACK_IMPORTED_MODULE_9__.ShapeDataHandlerService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_playback_service__WEBPACK_IMPORTED_MODULE_10__.PlaybackService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
    token: MapService,
    factory: MapService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 34288:
/*!********************************************!*\
  !*** ./src/app/services/marker.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkerService: () => (/* binding */ MarkerService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icon_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon.service */ 86671);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ 58540);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
// marker.service.ts




class MarkerService {
  constructor() {
    this.markersLayer = leaflet__WEBPACK_IMPORTED_MODULE_0__.layerGroup(); // Initialize markersLayer to hold all markers
  }
  // Method to add markers to the map
  addMarkers(map, data) {
    this.markersLayer.clearLayers(); // Clear any existing markers before adding new ones
    data.forEach(ship => {
      const iconUrl = _icon_service__WEBPACK_IMPORTED_MODULE_1__.IconService.getIconForShipType(ship.type).options.iconUrl;
      const shipBearing = ship.heading || ship.courseOverGround || 0;
      // Create HTML for the rotating ship icon
      const iconHtml = `
        <div class="rotating-ship" style="transform: rotate(${shipBearing}deg);">
          <img src="${iconUrl}" width="24" height="24" />
        </div>
      `;
      const icon = leaflet__WEBPACK_IMPORTED_MODULE_0__.divIcon({
        className: 'custom-ship-icon',
        html: iconHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      const marker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker([ship.lat, ship.lon], {
        icon
      }).bindPopup(this.createPopupContent(ship));
      this.markersLayer.addLayer(marker);
    });
    map.addLayer(this.markersLayer); // Add the markersLayer to the map
  }
  // Method to add a heatmap to the map
  addHeatMap(map, data) {
    if (this.heatmapLayer) {
      map.removeLayer(this.heatmapLayer); // Remove existing heatmap layer if it exists
    }

    const heatData = data.map(ship => [ship.lat, ship.lon, 1.0]);
    this.heatmapLayer = leaflet__WEBPACK_IMPORTED_MODULE_0__.heatLayer(heatData, {
      radius: 35,
      blur: 15,
      maxZoom: 17
    }).addTo(map);
  }
  // Private method to create popup content for the marker
  createPopupContent(ship) {
    const timeAgo = this.getTimeAgo(ship.timestamp);
    return `
      <div class="marker-popup">
        <h3>${ship.name}</h3>
        <ul>
          <li>ID: ${ship.mmsi}</li>
          <li>Name: ${ship.name}</li>
          <li>Type: ${ship.type}</li>
          <li>Coordinates: ${ship.lat}, ${ship.lon}</li>
          <li>Destination: ${ship.destination || 'N/A'}</li>
          <li>Course Over Ground: ${ship.courseOverGround || 'N/A'}</li>
          <li>Speed Over Ground: ${ship.speedOverGround || 'N/A'}</li>
          <li>Heading: ${ship.heading || 'N/A'}</li>
          <li>Last Received: ${timeAgo}</li>
        </ul>
      </div>
    `;
  }
  // Private method to calculate the time ago for the marker's data
  getTimeAgo(timestamp) {
    const now = moment__WEBPACK_IMPORTED_MODULE_2__();
    const then = moment__WEBPACK_IMPORTED_MODULE_2__(timestamp, 'DD-MM-YYYY HH:mm:ss');
    const duration = moment__WEBPACK_IMPORTED_MODULE_2__.duration(now.diff(then));
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    return `${days} days ${hours} hours ${minutes} minutes ago`;
  }
  static #_ = this.ɵfac = function MarkerService_Factory(t) {
    return new (t || MarkerService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: MarkerService,
    factory: MarkerService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 36896:
/*!**************************************************!*\
  !*** ./src/app/services/notification.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationService: () => (/* binding */ NotificationService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 58071);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ 49409);



class NotificationService {
  constructor(snackBar) {
    this.snackBar = snackBar;
    this.notificationsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject([]);
    this.notifications$ = this.notificationsSubject.asObservable();
    this.audio = new Audio('../../assets/sound/notification.mp3');
  }
  addNotification(notification) {
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...currentNotifications, notification]);
    this.playNotificationSound();
    this.showNotificationPopup(notification.message);
  }
  playNotificationSound() {
    this.audio.play().catch(error => console.error('Failed to play sound:', error));
  }
  deleteNotification(notification) {
    const notifications = this.notificationsSubject.getValue().filter(n => n !== notification);
    this.notificationsSubject.next(notifications);
  }
  showNotificationPopup(message) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
  static #_ = this.ɵfac = function NotificationService_Factory(t) {
    return new (t || NotificationService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__.MatSnackBar));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: NotificationService,
    factory: NotificationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 72381:
/*!**********************************************!*\
  !*** ./src/app/services/playback.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlaybackService: () => (/* binding */ PlaybackService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);


class PlaybackService {
  /**
   * Inisialisasi peta di dalam PlaybackService
   * @param map - Instance Leaflet map yang diterima dari MapService
   */
  initializePlayback(map) {
    this.map = map;
    this.addPlaybackControl();
  }
  /**
   * Menambahkan kontrol playback kustom ke peta menggunakan Leaflet
   */
  addPlaybackControl() {
    const controlDiv = leaflet__WEBPACK_IMPORTED_MODULE_0__.DomUtil.create('div', 'playback-control-container');
    controlDiv.innerHTML = `
      <div class="playback-bar" style="display: flex; align-items: center; justify-content: space-between; width: 500px;">
        <button class="control-button" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #333; transition: transform 0.2s ease-in-out; margin: 0 5px;">
          <i class="fa fa-play"></i>
        </button>
        <button class="control-button" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #333; transition: transform 0.2s ease-in-out; margin: 0 5px;">
          <i class="fa fa-undo"></i>
        </button>
        <input type="range" class="time-slider" min="0" max="100" value="50" style="flex: 1; margin: 0 10px; cursor: pointer;">
        <span class="time-display" style="font-size: 14px; color: #333; white-space: nowrap; margin-left: 10px;">
          17 OCT 2020 17:41:16 UTC
        </span>
        <button class="control-button" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #333; transition: transform 0.2s ease-in-out; margin: 0 5px;">
          <i class="fa fa-cog"></i>
        </button>
        <button class="control-button" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #333; transition: transform 0.2s ease-in-out; margin: 0 5px;">
          <i class="fa fa-times"></i>
        </button>
      </div>
    `;
    // Membuat kontrol kustom menggunakan L.Control.extend
    const PlaybackControl = leaflet__WEBPACK_IMPORTED_MODULE_0__.Control.extend({
      options: {
        position: 'bottomleft' // Posisi default Leaflet
      },

      onAdd: () => {
        return controlDiv;
      }
    });
    // Menambahkan kontrol kustom ke peta dan mengatur posisinya dengan CSS agar berada di tengah bawah
    this.map.addControl(new PlaybackControl());
    const mapContainer = this.map.getContainer();
    const playbackControlContainer = document.querySelector('.playback-control-container');
    if (playbackControlContainer) {
      // Memastikan kontrol berada di tengah bawah dengan CSS inline
      if (playbackControlContainer) {
        playbackControlContainer.style.position = 'absolute';
        playbackControlContainer.style.bottom = '20px';
        playbackControlContainer.style.left = '50%';
        playbackControlContainer.style.transform = 'translateX(-50%)';
        playbackControlContainer.style.zIndex = '1000';
        playbackControlContainer.style.background = 'rgba(161, 154, 154, 0)';
        playbackControlContainer.style.borderRadius = '8px';
        playbackControlContainer.style.padding = '10px';
        playbackControlContainer.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.158)';
        this.centerPlaybackControl(mapContainer, playbackControlContainer);
        this.map.on('resize', () => {
          this.centerPlaybackControl(mapContainer, playbackControlContainer);
        });
      }
    }
  }
  centerPlaybackControl(mapContainer, controlContainer) {
    const mapWidth = mapContainer.clientWidth;
    const controlWidth = controlContainer.clientWidth;
    controlContainer.style.left = `${(mapWidth - controlWidth) / 1}px`; // Mengatur posisi horizontal ke tengah
  }
  static #_ = this.ɵfac = function PlaybackService_Factory(t) {
    return new (t || PlaybackService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: PlaybackService,
    factory: PlaybackService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 58682:
/*!**************************************************!*\
  !*** ./src/app/services/polygon-zone-handler.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PolygonZoneHandler: () => (/* binding */ PolygonZoneHandler)
/* harmony export */ });
/* harmony import */ var _turf_turf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @turf/turf */ 40516);
/* harmony import */ var _turf_turf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/turf */ 79042);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 79736);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _services_polygon_zone_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/polygon-zone.service */ 49105);




class PolygonZoneHandler {
  constructor(polygonZoneService) {
    this.polygonZoneService = polygonZoneService;
  }
  loadPolygonZones() {
    return this.polygonZoneService.getPolygonZones().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(data => data.map(zone => {
      if (!zone.coordinates || zone.coordinates.length === 0) return null;
      let coordinates = zone.coordinates[0].map(coord => {
        if (coord && typeof coord.lat === 'number' && typeof coord.lng === 'number') {
          return [coord.lng, coord.lat];
        }
        return null;
      }).filter(coord => coord !== null);
      if (coordinates.length >= 3 && coordinates[0] !== coordinates[coordinates.length - 1]) {
        coordinates.push(coordinates[0]);
      }
      if (coordinates.length < 4) return null;
      return {
        ...zone,
        coordinates: [coordinates]
      };
    }).filter(zone => zone !== null)));
  }
  isShipInZone(ship, zone) {
    try {
      const point = _turf_turf__WEBPACK_IMPORTED_MODULE_2__.point([ship.lon, ship.lat]);
      const polygon = _turf_turf__WEBPACK_IMPORTED_MODULE_2__.polygon(zone.coordinates);
      return _turf_turf__WEBPACK_IMPORTED_MODULE_3__.booleanPointInPolygon(point, polygon);
    } catch (error) {
      console.error('Failed to create polygon or check ship in zone', error);
      return false;
    }
  }
  static #_ = this.ɵfac = function PolygonZoneHandler_Factory(t) {
    return new (t || PolygonZoneHandler)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_polygon_zone_service__WEBPACK_IMPORTED_MODULE_0__.PolygonZoneService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: PolygonZoneHandler,
    factory: PolygonZoneHandler.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 49105:
/*!**************************************************!*\
  !*** ./src/app/services/polygon-zone.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PolygonZoneService: () => (/* binding */ PolygonZoneService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 54860);


class PolygonZoneService {
  constructor(http) {
    this.http = http;
    this.apiUrl = 'http://165.154.208.232:3000/api/shapes/polygon'; // Update this URL as per your API endpoint
  }

  getPolygonZones() {
    return this.http.get(this.apiUrl);
  }
  static #_ = this.ɵfac = function PolygonZoneService_Factory(t) {
    return new (t || PolygonZoneService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: PolygonZoneService,
    factory: PolygonZoneService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 77565:
/*!***************************************************!*\
  !*** ./src/app/services/searchcontrol.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchControlService: () => (/* binding */ SearchControlService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.service */ 17015);
// searchcontrol.service.ts



class SearchControlService {
  constructor(dataService) {
    this.dataService = dataService;
  }
  addSearchControl(map, focusOnShip) {
    const searchContainer = leaflet__WEBPACK_IMPORTED_MODULE_0__.DomUtil.create('div', 'search-container');
    // Create the HTML structure for the search bar
    const formField = leaflet__WEBPACK_IMPORTED_MODULE_0__.DomUtil.create('div', 'custom-search-field', searchContainer);
    const searchInput = leaflet__WEBPACK_IMPORTED_MODULE_0__.DomUtil.create('input', 'search-input', formField);
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter MMSI or Ship Name';
    // Inline styles for positioning
    searchContainer.style.width = '320px';
    searchContainer.style.zIndex = '1000';
    formField.style.backgroundColor = 'rgba(161, 154, 154, 0)'; // Slightly transparent background
    formField.style.borderRadius = '12px';
    formField.style.padding = '10px';
    formField.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.158)';
    searchInput.style.width = '100%';
    searchInput.style.padding = '8px';
    searchInput.style.border = 'none';
    searchInput.style.outline = 'none';
    searchInput.style.backgroundColor = 'transparent';
    searchInput.style.color = '#000';
    searchInput.style.fontSize = '16px';
    leaflet__WEBPACK_IMPORTED_MODULE_0__.DomEvent.addListener(searchInput, 'input', () => {
      this.searchShip(searchInput.value, focusOnShip);
    });
    // Create a custom Leaflet control and handle custom positioning for top center
    const SearchControl = leaflet__WEBPACK_IMPORTED_MODULE_0__.Control.extend({
      onAdd: () => searchContainer,
      options: {
        position: 'topleft'
      } // Position placeholder, actual position handled below
    });

    const searchControlInstance = new SearchControl();
    searchControlInstance.addTo(map);
    // Override the default Leaflet positioning to place the control at the top center
    const mapContainer = map.getContainer();
    const containerWidth = mapContainer.clientWidth;
    searchContainer.style.position = 'absolute';
    searchContainer.style.top = '10px'; // Adjust vertical position as needed
    searchContainer.style.left = `${(containerWidth - searchContainer.clientWidth) / 2}px`; // Center it horizontally
    // Recalculate the position on map resize to keep the control centered
    map.on('resize', () => {
      const newContainerWidth = map.getContainer().clientWidth;
      searchContainer.style.left = `${(newContainerWidth - searchContainer.clientWidth) / 2}px`;
    });
  }
  searchShip(searchQuery, focusOnShip) {
    if (!searchQuery.trim()) {
      console.warn('Search query is empty');
      return;
    }
    this.dataService.getShipsData().subscribe(ships => {
      const foundShip = ships.find(ship => ship.name && (ship.mmsi.toString() === searchQuery.trim() || ship.name.toLowerCase().includes(searchQuery.toLowerCase())));
      if (foundShip) {
        focusOnShip(foundShip);
      } else {
        console.warn('Ship not found');
      }
    });
  }
  static #_ = this.ɵfac = function SearchControlService_Factory(t) {
    return new (t || SearchControlService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_data_service__WEBPACK_IMPORTED_MODULE_1__.DataService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: SearchControlService,
    factory: SearchControlService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 43107:
/*!********************************************************!*\
  !*** ./src/app/services/shape-data-handler.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShapeDataHandlerService: () => (/* binding */ ShapeDataHandlerService)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 97198);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ 27889);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 33252);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 13738);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 2389);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 54860);






class ShapeDataHandlerService {
  constructor(http) {
    this.http = http;
    this.apiUrl = 'http://165.154.208.232:3000/api/shapes';
  }
  /**
   * Prompts the user to enter data for the shape layer using SweetAlert.
   * Ensures that the popup remains visible during fullscreen mode.
   * @param layer - The drawn shape layer (Circle or Polygon)
   */
  promptForLayerData(layer) {
    const coordinates = layer instanceof leaflet__WEBPACK_IMPORTED_MODULE_0__.Circle ? layer.getLatLng() : layer.getLatLngs();
    sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
      title: 'Enter Shape Data',
      target: document.body,
      html: this.getHtmlForSwal(),
      focusConfirm: false,
      preConfirm: () => this.getShapeDataFromInput()
    }).then(result => {
      if (result.value) {
        const dataToSend = this.createDataObject(result.value, layer, coordinates);
        this.sendDataToServer(dataToSend);
      }
    });
    // Ensure that the popup is visible during fullscreen
    this.ensurePopupVisibilityInFullscreen();
  }
  /**
   * Ensures that the SweetAlert popup remains visible even when the map is in fullscreen mode.
   */
  ensurePopupVisibilityInFullscreen() {
    const updatePopupZIndex = () => {
      const swalContainer = document.querySelector('.swal2-container');
      if (swalContainer) {
        // Set the z-index to a very high number to ensure visibility during fullscreen
        swalContainer.style.zIndex = '2147483647'; // Highest z-index possible
        swalContainer.style.position = 'fixed'; // Make sure it's fixed to always be on top
      }
    };
    // Listen for all possible fullscreen change events
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange'].forEach(eventType => {
      document.addEventListener(eventType, updatePopupZIndex);
    });
    // Immediately apply the z-index to ensure visibility
    updatePopupZIndex();
  }
  /**
   * Creates the HTML content for the SweetAlert popup.
   */
  getHtmlForSwal() {
    return `
      <input id="mmsi" class="swal2-input" type="number" placeholder="MMSI" min="0" required>
      <input id="name" class="swal2-input" placeholder="Name" required>
      <select id="status" class="swal2-input">
        <option value="">Choose Status</option>
        <option value="Warning">Warning</option>
        <option value="Danger">Danger</option>
      </select>
      <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
    `;
  }
  createDataObject(inputData, layer, coordinates) {
    const color = this.getColorBasedOnStatus(inputData.status);
    if (layer.setStyle) {
      layer.setStyle({
        color
      });
    }
    return {
      type: layer instanceof leaflet__WEBPACK_IMPORTED_MODULE_0__.Circle ? 'circle' : 'polygon',
      properties: {
        ...inputData,
        color,
        opacity: 0.8
      },
      coordinates: this.getCoordinatesData(layer, coordinates)
    };
  }
  /**
   * Determines the color based on the status of the shape.
   */
  getColorBasedOnStatus(status) {
    switch (status) {
      case 'Warning':
        return '#FFFF00';
      // Yellow
      case 'Danger':
        return '#FF0000';
      // Red
      default:
        return '#0000FF';
      // Blue
    }
  }
  /**
   * Extracts coordinates data from the shape layer.
   */
  getCoordinatesData(layer, coordinates) {
    if (layer instanceof leaflet__WEBPACK_IMPORTED_MODULE_0__.Circle) {
      return {
        lat: coordinates.lat,
        lng: coordinates.lng,
        radius: layer.getRadius()
      };
    } else {
      return coordinates.map(latlngs => latlngs.map(latlng => ({
        lat: latlng.lat,
        lng: latlng.lng
      })));
    }
  }
  /**
   * Retrieves the shape data from the SweetAlert input fields.
   */
  getShapeDataFromInput() {
    const mmsi = document.getElementById('mmsi').value;
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const description = document.getElementById('description').value;
    // Validate the input data
    if (!mmsi || isNaN(Number(mmsi))) {
      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().showValidationMessage('MMSI is required and must be a number');
      return null;
    }
    return {
      mmsi: Number(mmsi),
      name,
      status,
      description
    };
  }
  /**
   * Sends the shape data to the server using HTTP POST.
   */
  sendDataToServer(data) {
    this.http.post(this.apiUrl, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(response => console.log('Data sent successfully:', response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.error('Error sending data:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(error);
    })).subscribe();
  }
  static #_ = this.ɵfac = function ShapeDataHandlerService_Factory(t) {
    return new (t || ShapeDataHandlerService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: ShapeDataHandlerService,
    factory: ShapeDataHandlerService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 128:
/*!******************************************!*\
  !*** ./src/app/services/shapeService.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShapeService: () => (/* binding */ ShapeService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 13738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 33252);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 54860);



class ShapeService {
  constructor(http) {
    this.http = http;
    this.apiUrl = 'http://165.154.208.232:3000/api/shapes'; // URL API backend
  }

  getShapes() {
    return this.http.get(this.apiUrl);
  }
  addShape(shapeData) {
    return this.http.post(this.apiUrl, shapeData);
  }
  // Dalam ShapeDataHandlerService
  deleteShape(shapeId) {
    return this.http.delete(`${this.apiUrl}/${shapeId}`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.tap)(() => console.log(`Deleting shape with id ${shapeId}`)), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => {
      console.error(`Deletion failed for shape with id ${shapeId}:`, error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.throwError)(() => new Error('Deletion failed'));
    }));
  }
  static #_ = this.ɵfac = function ShapeService_Factory(t) {
    return new (t || ShapeService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: ShapeService,
    factory: ShapeService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 94409:
/*!********************************************!*\
  !*** ./src/app/services/socket.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SocketService: () => (/* binding */ SocketService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 12235);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ 68589);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);



class SocketService {
  constructor() {
    this.socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_0__.io)('http://165.154.208.232:3000');
  }
  // Use Observable to handle data streams
  onAisDataUpdate() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      this.socket.on('aisDataUpdate', data => {
        observer.next(data);
      });
      // Handle socket disconnect or error
      return () => this.socket.off('aisDataUpdate');
    });
  }
  onShapeDataUpdate() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      this.socket.on('shapeDataUpdate', data => {
        observer.next(data);
      });
      // Handle socket disconnect or error
      return () => this.socket.off('shapeDataUpdate');
    });
  }
  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
  static #_ = this.ɵfac = function SocketService_Factory(t) {
    return new (t || SocketService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: SocketService,
    factory: SocketService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 22711:
/*!**********************************************!*\
  !*** ./src/app/sidebar/sidebar.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SidebarComponent: () => (/* binding */ SidebarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);


const _c0 = function () {
  return ["/dashboard"];
};
const _c1 = function () {
  return ["/tables"];
};
const _c2 = function () {
  return ["/newfitur"];
};
const _c3 = function () {
  return ["/notifications"];
};
class SidebarComponent {
  static #_ = this.ɵfac = function SidebarComponent_Factory(t) {
    return new (t || SidebarComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: SidebarComponent,
    selectors: [["app-sidebar"]],
    decls: 43,
    vars: 10,
    consts: [[1, "sidenav-header"], ["aria-hidden", "true", "id", "iconSidenav", 1, "fas", "fa-times", "p-3", "cursor-pointer", "text-white", "opacity-5", "position-absolute", "end-0", "top-0", "d-none", "d-xl-none"], [1, "navbar-brand", "m-0", 3, "routerLink"], [1, "fas", "fa-ship", "fa-2x", "navbar-brand-img", "text-white"], [1, "ms-1", "font-weight-bold", "text-white"], [1, "horizontal", "light", "mt-0", "mb-2"], ["id", "sidenav-collapse-main", 1, "collapse", "navbar-collapse", "w-auto"], [1, "navbar-nav"], [1, "nav-item", "mt-3"], [1, "ps-4", "ms-2", "text-uppercase", "text-xs", "text-white", "font-weight-bolder", "opacity-8"], [1, "nav-item"], ["routerLinkActive", "active bg-gradient-primary", 1, "nav-link", "text-white", 3, "routerLink"], [1, "text-white", "text-center", "me-2", "d-flex", "align-items-center", "justify-content-center"], [1, "material-icons", "opacity-10"], [1, "nav-link-text", "ms-1"]],
    template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "AIS ASSET Web App");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "hr", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6)(8, "ul", 7)(9, "li", 8)(10, "h5", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Analytics");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 10)(13, "a", 11)(14, "div", 12)(15, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li", 10)(20, "a", 11)(21, "div", 12)(22, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "table_view");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Tables");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "li", 8)(27, "h6", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Our Fitur");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "li", 10)(30, "a", 11)(31, "div", 12)(32, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "map");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Map");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li", 10)(37, "a", 11)(38, "div", 12)(39, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](7, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](9, _c3));
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkActive],
    styles: ["\n\n\n.mat-form-field[_ngcontent-%COMP%] {\n  color: black !important; \n\n}\n\n.mat-select-value-text[_ngcontent-%COMP%] {\n  color: black !important; \n\n}\n\n.mat-option-text[_ngcontent-%COMP%] {\n  color: black !important; \n\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0NBQWdDOztBQUVoQztFQUNFLHVCQUF1QixFQUFFLG1DQUFtQztBQUM5RDs7QUFFQTtFQUNFLHVCQUF1QixFQUFFLHdDQUF3QztBQUNuRTs7QUFFQTtFQUNFLHVCQUF1QixFQUFFLGdDQUFnQztBQUMzRCIsInNvdXJjZXNDb250ZW50IjpbIi8qIHN0eWxlcy5jc3MgYXRhdSBzdHlsZXMuc2NzcyAqL1xyXG5cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICBjb2xvcjogYmxhY2sgIWltcG9ydGFudDsgLyogV2FybmEgdGVrcyBkaSBkYWxhbSBmb3JtIGZpZWxkICovXHJcbn1cclxuXHJcbi5tYXQtc2VsZWN0LXZhbHVlLXRleHQge1xyXG4gIGNvbG9yOiBibGFjayAhaW1wb3J0YW50OyAvKiBXYXJuYSB0ZWtzIHlhbmcgZGlwaWxpaCBkaSBkcm9wZG93biAqL1xyXG59XHJcblxyXG4ubWF0LW9wdGlvbi10ZXh0IHtcclxuICBjb2xvcjogYmxhY2sgIWltcG9ydGFudDsgLyogV2FybmEgdGVrcyBkaSBvcHNpIGRyb3Bkb3duICovXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 17276:
/*!********************************************!*\
  !*** ./src/app/tables/tables.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TablesComponent: () => (/* binding */ TablesComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/paginator */ 39687);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/table */ 46798);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jspdf */ 10797);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jspdf-autotable */ 59880);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jspdf_autotable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _main_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../main/polygon-zone-handler */ 88986);
/* harmony import */ var _main_circle_zone_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../main/circle-zone-handler */ 72427);
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data.service */ 17015);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 51333);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 96355);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 55309);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/sort */ 87963);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 90895);
















function TablesComponent_mat_form_field_12_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const zone_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", zone_r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](zone_r20.properties == null ? null : zone_r20.properties.name);
  }
}
function TablesComponent_mat_form_field_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-form-field", 3)(1, "mat-label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Select Polygon Zone");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "mat-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChange", function TablesComponent_mat_form_field_12_Template_mat_select_selectionChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r21.onZoneChange($event.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, TablesComponent_mat_form_field_12_mat_option_4_Template, 2, 2, "mat-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.polygonZones);
  }
}
function TablesComponent_mat_form_field_13_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const zone_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", zone_r24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](zone_r24.properties == null ? null : zone_r24.properties.name);
  }
}
function TablesComponent_mat_form_field_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-form-field", 3)(1, "mat-label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Select Circle Zone");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "mat-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChange", function TablesComponent_mat_form_field_13_Template_mat_select_selectionChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r25.onZoneChange($event.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, TablesComponent_mat_form_field_13_mat_option_4_Template, 2, 2, "mat-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.circleZones);
  }
}
function TablesComponent_mat_option_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const size_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", size_r27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](size_r27);
  }
}
function TablesComponent_th_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "MMSI");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TablesComponent_td_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ship_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ship_r28.mmsi);
  }
}
function TablesComponent_th_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TablesComponent_td_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ship_r29 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ship_r29.name);
  }
}
function TablesComponent_th_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Latitude");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TablesComponent_td_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ship_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ship_r30.lat);
  }
}
function TablesComponent_th_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Longitude");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TablesComponent_td_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ship_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ship_r31.lon);
  }
}
function TablesComponent_th_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TablesComponent_td_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ship_r32 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ship_r32.type);
  }
}
function TablesComponent_th_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Timestamp");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TablesComponent_td_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ship_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ship_r33.timestamp);
  }
}
function TablesComponent_th_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Destination");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TablesComponent_td_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ship_r34 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ship_r34.destination);
  }
}
function TablesComponent_tr_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tr", 31);
  }
}
function TablesComponent_tr_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tr", 32);
  }
}
const _c0 = function () {
  return [10, 25, 100, 250];
};
class TablesComponent {
  constructor(polygonZoneHandler, circleZoneHandler, dataService) {
    this.polygonZoneHandler = polygonZoneHandler;
    this.circleZoneHandler = circleZoneHandler;
    this.dataService = dataService;
    this.polygonZones = [];
    this.circleZones = [];
    this.ships = [];
    this.filteredShips = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatTableDataSource();
    this.displayedColumns = ['mmsi', 'name', 'lat', 'lon', 'type', 'timestamp', 'destination'];
    this.selectedZoneType = '';
    this.pageSize = 25;
    this.selectedZoneName = '';
  }
  ngOnInit() {
    this.loadPolygonZones();
    this.loadCircleZones();
    this.loadShips();
  }
  ngAfterViewInit() {
    this.filteredShips.paginator = this.paginator;
  }
  loadPolygonZones() {
    this.polygonZoneHandler.loadPolygonZones().subscribe(data => {
      this.polygonZones = data;
    });
  }
  loadCircleZones() {
    this.circleZoneHandler.loadCircleZones().subscribe(data => {
      this.circleZones = data;
    });
  }
  loadShips() {
    this.dataService.getShipsData().subscribe(data => {
      this.ships = data;
      this.updateAllZoneCounts(); // Update ship counts for all zones after loading ships
    }, error => console.error('Failed to load ships:', error));
  }
  onZoneTypeChange(type) {
    this.selectedZoneType = type;
    this.filteredShips.data = [];
  }
  onZoneChange(zone) {
    this.selectedZoneName = zone.properties?.name || 'Unknown Zone';
    this.filteredShips.data = this.ships.filter(ship => this.isShipInZone(ship, zone, this.selectedZoneType));
  }
  onPageChange(event) {
    this.pageSize = event.pageSize;
  }
  onPageSizeChange(size) {
    this.pageSize = size;
    this.paginator.pageSize = size;
  }
  isShipInZone(ship, zone, type) {
    if (type === 'circle') {
      return this.circleZoneHandler.isShipInZone(ship, zone);
    } else if (type === 'polygon') {
      return this.polygonZoneHandler.isShipInZone(ship, zone);
    }
    return false;
  }
  updateAllZoneCounts() {
    // This method is kept in case you want to update counts for zones without selection
  }
  downloadPDF() {
    const doc = new jspdf__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const zoneName = this.selectedZoneName || 'Unknown Zone';
    const date = new Date();
    const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const fileName = `Report_of_${zoneName}_${dateString}.pdf`;
    const head = [['MMSI', 'Name', 'Latitude', 'Longitude', 'Type', 'Timestamp', 'Destination']];
    const data = this.filteredShips.data.map(ship => [ship.mmsi, ship.name, ship.lat, ship.lon, ship.type, ship.timestamp, ship.destination]);
    doc.text(`Laporan Zona ${zoneName}`, 14, 10);
    doc.text(` ${dateString}`, 14, 20);
    doc.text(`Jumlah Kapal: ${this.filteredShips.data.length}`, 14, 30);
    jspdf_autotable__WEBPACK_IMPORTED_MODULE_1___default()(doc, {
      head: head,
      body: data,
      styles: {
        fontSize: 8
      },
      margin: {
        top: 40
      }
    });
    doc.save(fileName);
  }
  static #_ = this.ɵfac = function TablesComponent_Factory(t) {
    return new (t || TablesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_main_polygon_zone_handler__WEBPACK_IMPORTED_MODULE_2__.PolygonZoneHandler), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_main_circle_zone_handler__WEBPACK_IMPORTED_MODULE_3__.CircleZoneHandler), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_data_service__WEBPACK_IMPORTED_MODULE_4__.DataService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: TablesComponent,
    selectors: [["app-tables"]],
    viewQuery: function TablesComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__.MatPaginator, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
      }
    },
    decls: 50,
    vars: 13,
    consts: [[1, "container"], [1, "row"], [1, "col-md-4"], ["appearance", "fill", 2, "width", "100%"], [2, "color", "black"], [2, "color", "black", 3, "selectionChange"], ["value", "polygon"], ["value", "circle"], ["appearance", "fill", "style", "width: 100%;", 4, "ngIf"], [1, "row", "mt-4"], [1, "col-md-12"], ["appearance", "fill"], [2, "color", "black", 3, "value", "selectionChange", "valueChange"], ["style", "color: black;", 3, "value", 4, "ngFor", "ngForOf"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "mmsi"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "lat"], ["matColumnDef", "lon"], ["matColumnDef", "type"], ["matColumnDef", "timestamp"], ["matColumnDef", "destination"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "length", "pageSize", "pageSizeOptions", "page"], ["mat-raised-button", "", "color", "primary", 3, "click"], [2, "color", "black", 3, "value"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]],
    template: function TablesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Select Zone Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "mat-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChange", function TablesComponent_Template_mat_select_selectionChange_6_listener($event) {
          return ctx.onZoneTypeChange($event.value);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Polygon Zone");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Circle Zone");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, TablesComponent_mat_form_field_12_Template, 5, 1, "mat-form-field", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, TablesComponent_mat_form_field_13_Template, 5, 1, "mat-form-field", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 9)(15, "div", 10)(16, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "mat-form-field", 11)(19, "mat-label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20, "Rows per page");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "mat-select", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChange", function TablesComponent_Template_mat_select_selectionChange_21_listener($event) {
          return ctx.onPageSizeChange($event.value);
        })("valueChange", function TablesComponent_Template_mat_select_valueChange_21_listener($event) {
          return ctx.pageSize = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](22, TablesComponent_mat_option_22_Template, 2, 2, "mat-option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "table", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](24, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](25, TablesComponent_th_25_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](26, TablesComponent_td_26_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](27, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](28, TablesComponent_th_28_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, TablesComponent_td_29_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](30, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, TablesComponent_th_31_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](32, TablesComponent_td_32_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](33, 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](34, TablesComponent_th_34_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](35, TablesComponent_td_35_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](36, 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](37, TablesComponent_th_37_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](38, TablesComponent_td_38_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](39, 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](40, TablesComponent_th_40_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](41, TablesComponent_td_41_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](42, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](43, TablesComponent_th_43_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](44, TablesComponent_td_44_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](45, TablesComponent_tr_45_Template, 1, 0, "tr", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](46, TablesComponent_tr_46_Template, 1, 0, "tr", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "mat-paginator", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("page", function TablesComponent_Template_mat_paginator_page_47_listener($event) {
          return ctx.onPageChange($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](48, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function TablesComponent_Template_button_click_48_listener() {
          return ctx.downloadPDF();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](49, "Download PDF");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedZoneType === "polygon");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.selectedZoneType === "circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Ships in Selected Zone: ", ctx.filteredShips.data.length, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.pageSize);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](11, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dataSource", ctx.filteredShips);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("length", ctx.filteredShips.data.length)("pageSize", ctx.pageSize)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](12, _c0));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatRow, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__.MatPaginator, _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSortHeader, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton],
    styles: ["\n\n.mat-elevation-z8[_ngcontent-%COMP%] {\n  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdGFibGVzL3RhYmxlcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlCQUF5QjtBQUN6QjtFQUNFLHlIQUF5SDtBQUMzSCIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRhYmxlcy5jb21wb25lbnQuY3NzICovXHJcbi5tYXQtZWxldmF0aW9uLXo4IHtcclxuICBib3gtc2hhZG93OiAwcHggM3B4IDNweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDNweCA0cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 99133:
/*!************************************************************!*\
  !*** ./src/app/uiconfigurator/uiconfigurator.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UiconfiguratorComponent: () => (/* binding */ UiconfiguratorComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

class UiconfiguratorComponent {
  static #_ = this.ɵfac = function UiconfiguratorComponent_Factory(t) {
    return new (t || UiconfiguratorComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: UiconfiguratorComponent,
    selectors: [["app-uiconfigurator"]],
    decls: 42,
    vars: 0,
    consts: [[1, "horizontal", "dark", "my-1"], [1, "card-body", "pt-sm-3", "pt-0"], [1, "mb-0"], ["href", "javascript:void(0)", 1, "switch-trigger", "background-color"], [1, "badge-colors", "my-2", "text-start"], ["data-color", "primary", "onclick", "sidebarColor(this)", 1, "badge", "filter", "bg-gradient-primary", "active"], ["data-color", "dark", "onclick", "sidebarColor(this)", 1, "badge", "filter", "bg-gradient-dark"], ["data-color", "info", "onclick", "sidebarColor(this)", 1, "badge", "filter", "bg-gradient-info"], ["data-color", "success", "onclick", "sidebarColor(this)", 1, "badge", "filter", "bg-gradient-success"], ["data-color", "warning", "onclick", "sidebarColor(this)", 1, "badge", "filter", "bg-gradient-warning"], ["data-color", "danger", "onclick", "sidebarColor(this)", 1, "badge", "filter", "bg-gradient-danger"], [1, "mt-3"], [1, "text-sm"], [1, "d-flex"], ["data-class", "bg-gradient-dark", "onclick", "sidebarType(this)", 1, "btn", "bg-gradient-dark", "px-3", "mb-2", "active"], ["data-class", "bg-transparent", "onclick", "sidebarType(this)", 1, "btn", "bg-gradient-dark", "px-3", "mb-2", "ms-2"], ["data-class", "bg-white", "onclick", "sidebarType(this)", 1, "btn", "bg-gradient-dark", "px-3", "mb-2", "ms-2"], [1, "horizontal", "dark", "my-3"], [1, "mt-2", "d-flex"], [1, "form-check", "form-switch", "ps-0", "ms-auto", "my-auto"], ["type", "checkbox", "id", "dark-version", "onclick", "toggleDarkMode(this)", 1, "form-check-input", "mt-1", "ms-auto"], [1, "w-100", "text-center"], ["href", "https:/therichpost.com", "data-icon", "octicon-star", "data-size", "large", "data-show-count", "true", "aria-label", "Star creativetimofficial/material-dashboard on GitHub", 1, "github-button"], ["href", "#", "target", "_blank", 1, "btn", "btn-dark", "mb-0", "me-2"], ["aria-hidden", "true", 1, "fab", "fa-twitter", "me-1"], ["aria-hidden", "true", 1, "fab", "fa-facebook-square", "me-1"]],
    template: function UiconfiguratorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "hr", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1)(2, "div")(3, "h6", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Sidebar Colors");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 3)(6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span", 5)(8, "span", 6)(9, "span", 7)(10, "span", 8)(11, "span", 9)(12, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11)(14, "h6", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Sidenav Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Choose between 2 different sidenav types.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 13)(19, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Dark ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Transparent ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " White ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "hr", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 18)(27, "h6", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Dark / Light");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 21)(32, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Laksana Future");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "h6", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Laksana Future");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "i", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, " Tweet ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "i", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " Share ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 14913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 78629);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 46700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 35528,
	"./af.js": 35528,
	"./ar": 1036,
	"./ar-dz": 17579,
	"./ar-dz.js": 17579,
	"./ar-kw": 69588,
	"./ar-kw.js": 69588,
	"./ar-ly": 11650,
	"./ar-ly.js": 11650,
	"./ar-ma": 93258,
	"./ar-ma.js": 93258,
	"./ar-ps": 25467,
	"./ar-ps.js": 25467,
	"./ar-sa": 54085,
	"./ar-sa.js": 54085,
	"./ar-tn": 90287,
	"./ar-tn.js": 90287,
	"./ar.js": 1036,
	"./az": 89757,
	"./az.js": 89757,
	"./be": 59620,
	"./be.js": 59620,
	"./bg": 31139,
	"./bg.js": 31139,
	"./bm": 4042,
	"./bm.js": 4042,
	"./bn": 19641,
	"./bn-bd": 19126,
	"./bn-bd.js": 19126,
	"./bn.js": 19641,
	"./bo": 494,
	"./bo.js": 494,
	"./br": 20934,
	"./br.js": 20934,
	"./bs": 26274,
	"./bs.js": 26274,
	"./ca": 45831,
	"./ca.js": 45831,
	"./cs": 92354,
	"./cs.js": 92354,
	"./cv": 79692,
	"./cv.js": 79692,
	"./cy": 58774,
	"./cy.js": 58774,
	"./da": 38955,
	"./da.js": 38955,
	"./de": 21557,
	"./de-at": 24954,
	"./de-at.js": 24954,
	"./de-ch": 81881,
	"./de-ch.js": 81881,
	"./de.js": 21557,
	"./dv": 16475,
	"./dv.js": 16475,
	"./el": 38877,
	"./el.js": 38877,
	"./en-au": 70454,
	"./en-au.js": 70454,
	"./en-ca": 67356,
	"./en-ca.js": 67356,
	"./en-gb": 10456,
	"./en-gb.js": 10456,
	"./en-ie": 28789,
	"./en-ie.js": 28789,
	"./en-il": 85471,
	"./en-il.js": 85471,
	"./en-in": 39664,
	"./en-in.js": 39664,
	"./en-nz": 97672,
	"./en-nz.js": 97672,
	"./en-sg": 80805,
	"./en-sg.js": 80805,
	"./eo": 87390,
	"./eo.js": 87390,
	"./es": 1564,
	"./es-do": 51473,
	"./es-do.js": 51473,
	"./es-mx": 92089,
	"./es-mx.js": 92089,
	"./es-us": 84156,
	"./es-us.js": 84156,
	"./es.js": 1564,
	"./et": 6513,
	"./et.js": 6513,
	"./eu": 7856,
	"./eu.js": 7856,
	"./fa": 2378,
	"./fa.js": 2378,
	"./fi": 22687,
	"./fi.js": 22687,
	"./fil": 80032,
	"./fil.js": 80032,
	"./fo": 46845,
	"./fo.js": 46845,
	"./fr": 8875,
	"./fr-ca": 56425,
	"./fr-ca.js": 56425,
	"./fr-ch": 41746,
	"./fr-ch.js": 41746,
	"./fr.js": 8875,
	"./fy": 67037,
	"./fy.js": 67037,
	"./ga": 11217,
	"./ga.js": 11217,
	"./gd": 37010,
	"./gd.js": 37010,
	"./gl": 51931,
	"./gl.js": 51931,
	"./gom-deva": 64488,
	"./gom-deva.js": 64488,
	"./gom-latn": 39566,
	"./gom-latn.js": 39566,
	"./gu": 34984,
	"./gu.js": 34984,
	"./he": 69090,
	"./he.js": 69090,
	"./hi": 42085,
	"./hi.js": 42085,
	"./hr": 38787,
	"./hr.js": 38787,
	"./hu": 2901,
	"./hu.js": 2901,
	"./hy-am": 59819,
	"./hy-am.js": 59819,
	"./id": 44074,
	"./id.js": 44074,
	"./is": 70715,
	"./is.js": 70715,
	"./it": 31746,
	"./it-ch": 77040,
	"./it-ch.js": 77040,
	"./it.js": 31746,
	"./ja": 3180,
	"./ja.js": 3180,
	"./jv": 34346,
	"./jv.js": 34346,
	"./ka": 65538,
	"./ka.js": 65538,
	"./kk": 79772,
	"./kk.js": 79772,
	"./km": 87905,
	"./km.js": 87905,
	"./kn": 79125,
	"./kn.js": 79125,
	"./ko": 69140,
	"./ko.js": 69140,
	"./ku": 2354,
	"./ku-kmr": 44662,
	"./ku-kmr.js": 44662,
	"./ku.js": 2354,
	"./ky": 63768,
	"./ky.js": 63768,
	"./lb": 14016,
	"./lb.js": 14016,
	"./lo": 83169,
	"./lo.js": 83169,
	"./lt": 62353,
	"./lt.js": 62353,
	"./lv": 83243,
	"./lv.js": 83243,
	"./me": 52338,
	"./me.js": 52338,
	"./mi": 35555,
	"./mi.js": 35555,
	"./mk": 85794,
	"./mk.js": 85794,
	"./ml": 53151,
	"./ml.js": 53151,
	"./mn": 46458,
	"./mn.js": 46458,
	"./mr": 69165,
	"./mr.js": 69165,
	"./ms": 8680,
	"./ms-my": 87477,
	"./ms-my.js": 87477,
	"./ms.js": 8680,
	"./mt": 79684,
	"./mt.js": 79684,
	"./my": 40285,
	"./my.js": 40285,
	"./nb": 45922,
	"./nb.js": 45922,
	"./ne": 29040,
	"./ne.js": 29040,
	"./nl": 5066,
	"./nl-be": 74460,
	"./nl-be.js": 74460,
	"./nl.js": 5066,
	"./nn": 53693,
	"./nn.js": 53693,
	"./oc-lnc": 88676,
	"./oc-lnc.js": 88676,
	"./pa-in": 92341,
	"./pa-in.js": 92341,
	"./pl": 57416,
	"./pl.js": 57416,
	"./pt": 84344,
	"./pt-br": 30113,
	"./pt-br.js": 30113,
	"./pt.js": 84344,
	"./ro": 72643,
	"./ro.js": 72643,
	"./ru": 61305,
	"./ru.js": 61305,
	"./sd": 96095,
	"./sd.js": 96095,
	"./se": 74486,
	"./se.js": 74486,
	"./si": 58742,
	"./si.js": 58742,
	"./sk": 96722,
	"./sk.js": 96722,
	"./sl": 3345,
	"./sl.js": 3345,
	"./sq": 52416,
	"./sq.js": 52416,
	"./sr": 39450,
	"./sr-cyrl": 50501,
	"./sr-cyrl.js": 50501,
	"./sr.js": 39450,
	"./ss": 32222,
	"./ss.js": 32222,
	"./sv": 9454,
	"./sv.js": 9454,
	"./sw": 19638,
	"./sw.js": 19638,
	"./ta": 96494,
	"./ta.js": 96494,
	"./te": 94435,
	"./te.js": 94435,
	"./tet": 25003,
	"./tet.js": 25003,
	"./tg": 13706,
	"./tg.js": 13706,
	"./th": 16025,
	"./th.js": 16025,
	"./tk": 59780,
	"./tk.js": 59780,
	"./tl-ph": 22068,
	"./tl-ph.js": 22068,
	"./tlh": 39167,
	"./tlh.js": 39167,
	"./tr": 32494,
	"./tr.js": 32494,
	"./tzl": 58707,
	"./tzl.js": 58707,
	"./tzm": 91296,
	"./tzm-latn": 34532,
	"./tzm-latn.js": 34532,
	"./tzm.js": 91296,
	"./ug-cn": 12086,
	"./ug-cn.js": 12086,
	"./uk": 85069,
	"./uk.js": 85069,
	"./ur": 29304,
	"./ur.js": 29304,
	"./uz": 95115,
	"./uz-latn": 97609,
	"./uz-latn.js": 97609,
	"./uz.js": 95115,
	"./vi": 34802,
	"./vi.js": 34802,
	"./x-pseudo": 65605,
	"./x-pseudo.js": 65605,
	"./yo": 88456,
	"./yo.js": 88456,
	"./zh-cn": 23272,
	"./zh-cn.js": 23272,
	"./zh-hk": 9402,
	"./zh-hk.js": 9402,
	"./zh-mo": 48101,
	"./zh-mo.js": 48101,
	"./zh-tw": 40262,
	"./zh-tw.js": 40262
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 46700;

/***/ }),

/***/ 24654:
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map