'use strict';
app.controller('Step1Controller', ['$scope', '$rootScope', 'ngAppSettings', '$timeout', '$location', '$http',
    'CommonService', 'Step1Services',
    function ($scope, $rootScope, ngAppSettings, $timeout, $location, $http, commonService, step1Services) {
        var rand = Math.random();
        $scope.settings = {
            cultures: [
                { specificulture: 'en-us', fullName: 'United States - English (Default)', icon: 'flag-icon-us' },
                { specificulture: 'fr-dz', fullName: 'Algeria - Fran�ais', icon: 'flag-icon-dz' },
                { specificulture: 'es-ar', fullName: 'Argentina - Espa�ol', icon: 'flag-icon-ar' },
                { specificulture: 'en-au', fullName: 'Australia - English', icon: 'flag-icon-au' },
                { specificulture: 'nl-be', fullName: 'Belgi� - Nederlands', icon: 'flag-icon-be' },
                { specificulture: 'fr-be', fullName: 'Belgique - Fran�ais', icon: 'flag-icon-be' },
                { specificulture: 'es-bo', fullName: 'Bolivia - Espa�ol', icon: 'flag-icon-bo' },
                { specificulture: 'bs-ba', fullName: 'Bosna i Hercegovina � Bosanski', icon: 'flag-icon-ba' },
                { specificulture: 'pt-br', fullName: 'Brasil - Portugu�s', icon: 'flag-icon-br' },
                { specificulture: 'en-ca', fullName: 'Canada - English', icon: 'flag-icon-ca' },
                { specificulture: 'fr-ca', fullName: 'Canada - Fran�ais', icon: 'flag-icon-ca' },
                { specificulture: 'cs-cz', fullName: 'Cesk� Republika - Ce�tina', icon: 'flag-icon-cz' },
                { specificulture: 'es-cl', fullName: 'Chile - Espa�ol', icon: 'flag-icon-cl' },
                { specificulture: 'es-co', fullName: 'Colombia - Espa�ol', icon: 'flag-icon-co' },
                { specificulture: 'es-cr', fullName: 'Costa Rica - Espa�ol', icon: 'flag-icon-cr' },
                { specificulture: 'sr-latn-me', fullName: 'Crna Gora - Srpski', icon: 'flag-icon-me' },
                { specificulture: 'en-cy', fullName: 'Cyprus - English', icon: 'flag-icon-cy' },
                { specificulture: 'da-dk', fullName: 'Danmark - Dansk', icon: 'flag-icon-dk' },
                { specificulture: 'de-de', fullName: 'Deutschland - Deutsch', icon: 'flag-icon-de' },
                { specificulture: 'es-ec', fullName: 'Ecuador - Espa�ol', icon: 'flag-icon-ec' },
                { specificulture: 'et-ee', fullName: 'Eesti - Eesti', icon: 'flag-icon-ee' },
                { specificulture: 'en-eg', fullName: 'Egypt - English', icon: 'flag-icon-eg' },
                { specificulture: 'es-sv', fullName: 'El Salvador - Espa�ol', icon: 'flag-icon-sv' },
                { specificulture: 'es-es', fullName: 'Espa�a - Espa�ol', icon: 'flag-icon-es' },
                { specificulture: 'fr-fr', fullName: 'France - Fran�ais', icon: 'flag-icon-fr' },
                { specificulture: 'es-gt', fullName: 'Guatemala - Espa�ol', icon: 'flag-icon-gt' },
                { specificulture: 'en-gulf', fullName: 'Gulf - English', icon: 'flag-icon-lf' },
                { specificulture: 'es-hn', fullName: 'Honduras - Espa�ol', icon: 'flag-icon-hn' },
                { specificulture: 'en-hk', fullName: 'Hong Kong SAR - English', icon: 'flag-icon-hk' },
                { specificulture: 'hr-hr', fullName: 'Hrvatska - Hrvatski', icon: 'flag-icon-hr' },
                { specificulture: 'en-in', fullName: 'India - English', icon: 'flag-icon-in' },
                { specificulture: 'id-id', fullName: 'Indonesia - Bahasa Indonesia', icon: 'flag-icon-id' },
                { specificulture: 'en-ie', fullName: 'Ireland - English', icon: 'flag-icon-ie' },
                { specificulture: 'is-is', fullName: '�sland - �slenska', icon: 'flag-icon-is' },
                { specificulture: 'it-it', fullName: 'Italia - Italiano', icon: 'flag-icon-it' },
                { specificulture: 'en-jo', fullName: 'Jordan - English', icon: 'flag-icon-jo' },
                { specificulture: 'lv-lv', fullName: 'Latvija - Latvie�u', icon: 'flag-icon-lv' },
                { specificulture: 'en-lb', fullName: 'Lebanon - English', icon: 'flag-icon-lb' },
                { specificulture: 'lt-lt', fullName: 'Lietuva - Lietuviu', icon: 'flag-icon-lt' },
                { specificulture: 'hu-hu', fullName: 'Magyarorsz�g - Magyar', icon: 'flag-icon-hu' },
                { specificulture: 'en-my', fullName: 'Malaysia - English', icon: 'flag-icon-my' },
                { specificulture: 'en-mt', fullName: 'Malta - English', icon: 'flag-icon-mt' },
                { specificulture: 'es-mx', fullName: 'M�xico - Espa�ol', icon: 'flag-icon-mx' },
                { specificulture: 'fr-ma', fullName: 'Morocco - Fran�ais', icon: 'flag-icon-ma' },
                { specificulture: 'nl-nl', fullName: 'Nederland - Nederlands', icon: 'flag-icon-nl' },
                { specificulture: 'en-nz', fullName: 'New Zealand - English', icon: 'flag-icon-nz' },
                { specificulture: 'es-ni', fullName: 'Nicaragua - Espa�ol', icon: 'flag-icon-ni' },
                { specificulture: 'en-ng', fullName: 'Nigeria - English', icon: 'flag-icon-ng' },
                { specificulture: 'nb-no', fullName: 'Norge - Bokm�l', icon: 'flag-icon-no' },
                { specificulture: 'de-at', fullName: '�sterreich - Deutsch', icon: 'flag-icon-at' },
                { specificulture: 'en-pk', fullName: 'Pakistan - English', icon: 'flag-icon-pk' },
                { specificulture: 'es-pa', fullName: 'Panam� - Espa�ol', icon: 'flag-icon-pa' },
                { specificulture: 'es-py', fullName: 'Paraguay - Espa�ol', icon: 'flag-icon-py' },
                { specificulture: 'es-pe', fullName: 'Per� - Espa�ol', icon: 'flag-icon-pe' },
                { specificulture: 'en-ph', fullName: 'Philippines - English', icon: 'flag-icon-ph' },
                { specificulture: 'pl-pl', fullName: 'Polska - Polski', icon: 'flag-icon-pl' },
                { specificulture: 'pt-pt', fullName: 'Portugal - Portugu�s', icon: 'flag-icon-pt' },
                { specificulture: 'es-pr', fullName: 'Puerto Rico - Espa�ol', icon: 'flag-icon-pr' },
                { specificulture: 'es-do', fullName: 'Rep�blica Dominicana - Espa�ol', icon: 'flag-icon-do' },
                { specificulture: 'ro-md', fullName: 'Republica Moldova - Rom�na', icon: 'flag-icon-md' },
                { specificulture: 'ro-ro', fullName: 'Rom�nia - Rom�na', icon: 'flag-icon-ro' },
                { specificulture: 'en-sa', fullName: 'Saudi Arabia - English', icon: 'flag-icon-sa' },
                { specificulture: 'de-ch', fullName: 'Schweiz - Deutsch', icon: 'flag-icon-ch' },
                { specificulture: 'en-sg', fullName: 'Singapore - English', icon: 'flag-icon-sg' },
                { specificulture: 'sl-si', fullName: 'Slovenija - Sloven�cina', icon: 'flag-icon-si' },
                { specificulture: 'sk-sk', fullName: 'Slovensko - Slovencina', icon: 'flag-icon-sk' },
                { specificulture: 'en-za', fullName: 'South Africa - English', icon: 'flag-icon-za' },
                { specificulture: 'sr-latn-rs', fullName: 'Srbija - Srpski', icon: 'flag-icon-rs' },
                { specificulture: 'en-lk', fullName: 'Sri Lanka - English', icon: 'flag-icon-lk' },
                { specificulture: 'fr-ch', fullName: 'Suisse - Fran�ais', icon: 'flag-icon-ch' },
                { specificulture: 'fi-fi', fullName: 'Suomi - Suomi', icon: 'flag-icon-fi' },
                { specificulture: 'sv-se', fullName: 'Sverige - Svenska', icon: 'flag-icon-se' },
                { specificulture: 'fr-tn', fullName: 'Tunisia - Fran�ais', icon: 'flag-icon-tn' },
                { specificulture: 'tr-tr', fullName: 'T�rkiye - T�rk�e', icon: 'flag-icon-tr' },
                { specificulture: 'en-gb', fullName: 'United Kingdom - English', icon: 'flag-icon-gb' },
                { specificulture: 'en-us', fullName: 'United States - English', icon: 'flag-icon-us' },
                { specificulture: 'es-uy', fullName: 'Uruguay - Espa�ol', icon: 'flag-icon-uy' },
                { specificulture: 'es-ve', fullName: 'Venezuela - Espa�ol', icon: 'flag-icon-ve' },
                { specificulture: 'vi-vn', fullName: 'Vi?t Nam - Ti�ng vi?t', icon: 'flag-icon-vn' },
                { specificulture: 'el-gr', fullName: '????da - ????????', icon: 'flag-icon-gr' },
                { specificulture: 'ru-by', fullName: '???????? - ??????????', icon: 'flag-icon-by' },
                { specificulture: 'bg-bg', fullName: '???????? - ?????????', icon: 'flag-icon-bg' },
                { specificulture: 'ru-kz', fullName: '????????? - ???????', icon: 'flag-icon-kz' },
                { specificulture: 'ru-ru', fullName: '?????? - ???????', icon: 'flag-icon-ru' },
                { specificulture: 'uk-ua', fullName: '??????? - ??????????', icon: 'flag-icon-ua' },
                { specificulture: 'he-il', fullName: '????? - ?????', icon: 'flag-icon-il' },
                { specificulture: 'ar-iq', fullName: '?????? - ???????', icon: 'flag-icon-iq' },
                { specificulture: 'ar-sa', fullName: '??????? ??????? ???????? - ???????', icon: 'flag-icon-sa' },
                { specificulture: 'ar-ly', fullName: '????? - ???????', icon: 'flag-icon-ly' },
                { specificulture: 'ar-eg', fullName: '??? - ???????', icon: 'flag-icon-eg' },
                { specificulture: 'ar-gulf', fullName: '??? ?????? - ???????', icon: 'flag-icon-lf' },
                { specificulture: 'th-th', fullName: '??? - ???', icon: 'flag-icon-th' },
                { specificulture: 'ko-kr', fullName: '???? - ???', icon: 'flag-icon-kr' },
                { specificulture: 'zh-cn', fullName: '?? - ????', icon: 'flag-icon-cn' },
                { specificulture: 'zh-tw', fullName: '?? - ????', icon: 'flag-icon-tw' },
                { specificulture: 'ja-jp', fullName: '?? - ???', icon: 'flag-icon-jp' },
                { specificulture: 'zh-hk', fullName: '??????? - ????', icon: 'flag-icon-hk' }

            ]
        };
        $scope.initCmsModel = {
            isUseLocal: false,
            localDbConnectionString: 'Server=(localdb)\\MSSQLLocalDB;Initial Catalog=' + rand + 'sio-cms.db;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True',
            sqliteDbConnectionString: 'Data Source=' + rand + 'sio-cms.db',
            localDbName: rand + 'sio-cms.db',
            dataBaseServer: '',
            dataBaseName: '',
            dataBaseUser: '',
            dataBasePassword: '',
            adminPassword: '',
            lang: 'en-us',
            isSqlite: false,
            culture: $scope.settings.cultures[0]
        };
        $scope.updateLocalDbName = function () {
            $scope.initCmsModel.localDbConnectionString = 'Server=(localdb)\\mssqllocaldb;Database=' + $scope.initCmsModel.localDbName + ';Trusted_Connection=True;MultipleActiveResultSets=true';
            $scope.initCmsModel.sqliteDbConnectionString = 'Data Source=' + $scope.initCmsModel.localDbName;
        };
        $scope.initCms = async function () {
            $rootScope.isBusy = true;
            var result = await step1Services.initCms($scope.initCmsModel);
            if (result.isSucceed) {
                $rootScope.isBusy = false;
                window.location.href = '/init/step2';
            }
            else {
                if (result) { $rootScope.showMessage('', result.errors, 'danger'); }
                $rootScope.isBusy = false;
                $scope.$apply();
            }
        }
    }]);
