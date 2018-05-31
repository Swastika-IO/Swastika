﻿'use strict';
app.controller('ModuleDataController', ['$scope', '$rootScope', '$routeParams', '$timeout', '$location', 'authService', 'ModuleDataServices',
    function ($scope, $rootScope, $routeParams, $timeout, $location, authService, moduleDataServices) {
        $scope.request = {
            pageSize: '10',
            pageIndex: 0,
            status: $rootScope.swStatus[1],
            orderBy: 'CreatedDateTime',
            direction: '1',
            fromDate: null,
            toDate: null,
            keyword: ''
        };
        $scope.moduleDataFile = {
            file: null,
            fullPath: '',
            folder: 'ModuleData',
            title: '',
            description: ''
        };
        $scope.activedModuleData = null;
        $scope.relatedModuleDatas = [];
        $rootScope.isBusy = false;
        $scope.data = {
            pageIndex: 0,
            pageSize: 1,
            totalItems: 0,
        };
        $scope.errors = [];

        $scope.range = function (max) {
            var input = [];
            for (var i = 1; i <= max; i += 1) input.push(i);
            return input;
        };

        $scope.getModuleData = async function (id) {
            $rootScope.isBusy = true;
            var resp = await moduleDataServices.getModuleData(id, 'be');
            if (resp.isSucceed) {
                $scope.activedModuleData = resp.data;
                $rootScope.initEditor();
                $scope.$apply();
            }
            else {
                $rootScope.showErrors(resp.errors);
                $scope.$apply();
            }
        };

        $scope.initModuleForm = async function () {
            var resp = null;
            if ($scope.id) {
                var resp = await moduleDataServices.getModuleData($scope.id, $scope.dataId, 'be');
            }
            else {
                var resp = await moduleDataServices.initModuleForm($scope.name);
            }
            
            if (resp.isSucceed) {
                $scope.activedModuleData = resp.data;
                $scope.$apply();
            }
            else {
                $rootScope.showErrors(resp.errors);
                $scope.$apply();
            }
        };

        $scope.loadParams = async function () {
            $rootScope.isBusy = true;
            $scope.dataId = $routeParams.id;
            $scope.backUrl = '/backend/module/data/' + $routeParams.moduleId;
            $scope.moduleId = $routeParams.moduleId;
            
        }
        $scope.loadModuleData = async function () {
            $rootScope.isBusy = true;
            var moduleId = $routeParams.moduleId;
            var id = $routeParams.id;
            var response = await moduleDataServices.getModuleData(moduleId, id, 'be');
            if (response.isSucceed) {
                $scope.activedModuleData = response.data;
                $rootScope.initEditor();
                $scope.$apply();
            }
            else {
                $rootScope.showErrors(response.errors);
                $scope.$apply();
            }
        };
        $scope.loadModuleDatas = async function (pageIndex) {
            if (pageIndex != undefined) {
                $scope.request.pageIndex = pageIndex;
            }
            if ($scope.request.fromDate != null) {
                var d = new Date($scope.request.fromDate);
                $scope.request.fromDate = d.toISOString();
            }
            if ($scope.request.toDate != null) {
                $scope.request.toDate = $scope.request.toDate.toISOString();
            }
            var resp = await moduleDataServices.getModuleDatas($scope.request);
            if (resp.isSucceed) {

                $scope.data = resp.data;
                console.log($scope.data);
                $scope.$apply();
            }
            else {
                $rootScope.showErrors(resp.errors);
                $scope.$apply();
            }
        };

        $scope.removeModuleData = async function (id) {
            if (confirm("Are you sure!")) {
                var resp = await moduleDataServices.removeModuleData(id);
                if (resp.isSucceed) {
                    $scope.loadModuleDatas();
                }
                else {
                    $rootScope.showErrors(resp.errors);
                }
            }
        };

        $scope.saveModuleData = async function () {
            //$scope.activedModuleData.content = $('.editor-content.content').val();
            //$scope.activedModuleData.excerpt = $('.editor-content.excerpt').val();
            var resp = await moduleDataServices.saveModuleData($scope.activedModuleData);
            if (resp.isSucceed) {
                $scope.activedModuleData = resp.data;
                $rootScope.showMessage('Thành công', 'success');
                $rootScope.isBusy = false;
                $scope.$apply();
                //$location.path('/backend/moduleData/details/' + resp.data.id);
            }
            else {
                $rootScope.showErrors(resp.errors);
                $scope.$apply();
            }
        };

    }]);
