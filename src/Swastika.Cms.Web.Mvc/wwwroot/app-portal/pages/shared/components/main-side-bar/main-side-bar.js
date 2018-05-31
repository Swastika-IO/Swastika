﻿modules.component('mainSideBar', {
    templateUrl: '/app-portal/pages/shared/components/main-side-bar/main-side-bar.html',
    controller: function ($scope) {
        var ctrl = this;
        var culture = $('#lang').val();
        ctrl.items = [
            {
                title: 'Dashboard',
                shortTitle: 'Dashboard',
                icon: 'mi mi-Tiles',
                href: '/backend',
                subMenus: []
            },
            {
                title: 'Articles',
                shortTitle: 'Articles',
                icon: 'mi mi-Package',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/article/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/article/list',
                        icon: 'mi mi-List'
                    }
                ]
            },
            {
                title: 'Products',
                shortTitle: 'Products',
                icon: 'mi mi-Package',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/product/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/product/list',
                        icon: 'mi mi-List'
                    }
                ]
            },
            {
                title: 'Pages',
                shortTitle: 'Pages',
                icon: 'mi mi-Page',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/page/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/page/list',
                        icon: 'mi mi-List'
                    }
                ]
            },
            {
                title: 'Modules',
                shortTitle: 'Modules',
                icon: 'mi mi-ResolutionLegacy',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/module/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/module/list',
                        icon: 'mi mi-List'
                    }
                ]
            },
            {
                title: 'Widgets',
                shortTitle: 'Widgets',
                icon: 'mi mi-Component',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/widgets/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/widgets/list',
                        icon: 'mi mi-List'
                    }
                ]
            },
            {
                title: 'Themes',
                shortTitle: 'Themes',
                icon: 'mi mi-Personalize',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/themes/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/themes/list',
                        icon: 'mi mi-List'
                    }
                ]
            },
            {
                title: 'Media',
                shortTitle: 'Media',
                icon: 'mi mi-Photo2',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/media/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/media/list',
                        icon: 'mi mi-List'
                    }
                ]
            },
            {
                title: 'Team',
                shortTitle: 'Team',
                icon: 'mi mi-Contact',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/team/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/team/list',
                        icon: 'mi mi-List'
                    }
                ]
            },
            {
                title: 'Settings',
                shortTitle: 'Settings',
                icon: 'mi mi-Settings mi-spin',
                href: '#',
                subMenus: [
                    {
                        title: 'Create',
                        href: '/backend/settings/create',
                        icon: 'mi mi-Add'
                    },
                    {
                        title: 'List',
                        href: '/backend/settings/list',
                        icon: 'mi mi-List'
                    }
                ]
            }
        ]
    },
    bindings: {
    }
});