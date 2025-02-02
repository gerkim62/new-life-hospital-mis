/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as VisitsIndexImport } from './routes/visits/index'
import { Route as VisitsVisitIdImport } from './routes/visits/$visitId'
import { Route as PatientsPatientIdImport } from './routes/patients/$patientId'
import { Route as AuthSignupImport } from './routes/auth/signup'
import { Route as AuthLoginImport } from './routes/auth/login'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const VisitsIndexRoute = VisitsIndexImport.update({
  id: '/visits/',
  path: '/visits/',
  getParentRoute: () => rootRoute,
} as any)

const VisitsVisitIdRoute = VisitsVisitIdImport.update({
  id: '/visits/$visitId',
  path: '/visits/$visitId',
  getParentRoute: () => rootRoute,
} as any)

const PatientsPatientIdRoute = PatientsPatientIdImport.update({
  id: '/patients/$patientId',
  path: '/patients/$patientId',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/auth/signup',
  path: '/auth/signup',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/auth/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof rootRoute
    }
    '/patients/$patientId': {
      id: '/patients/$patientId'
      path: '/patients/$patientId'
      fullPath: '/patients/$patientId'
      preLoaderRoute: typeof PatientsPatientIdImport
      parentRoute: typeof rootRoute
    }
    '/visits/$visitId': {
      id: '/visits/$visitId'
      path: '/visits/$visitId'
      fullPath: '/visits/$visitId'
      preLoaderRoute: typeof VisitsVisitIdImport
      parentRoute: typeof rootRoute
    }
    '/visits/': {
      id: '/visits/'
      path: '/visits'
      fullPath: '/visits'
      preLoaderRoute: typeof VisitsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutLazyRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/signup': typeof AuthSignupRoute
  '/patients/$patientId': typeof PatientsPatientIdRoute
  '/visits/$visitId': typeof VisitsVisitIdRoute
  '/visits': typeof VisitsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutLazyRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/signup': typeof AuthSignupRoute
  '/patients/$patientId': typeof PatientsPatientIdRoute
  '/visits/$visitId': typeof VisitsVisitIdRoute
  '/visits': typeof VisitsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutLazyRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/signup': typeof AuthSignupRoute
  '/patients/$patientId': typeof PatientsPatientIdRoute
  '/visits/$visitId': typeof VisitsVisitIdRoute
  '/visits/': typeof VisitsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/auth/login'
    | '/auth/signup'
    | '/patients/$patientId'
    | '/visits/$visitId'
    | '/visits'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/auth/login'
    | '/auth/signup'
    | '/patients/$patientId'
    | '/visits/$visitId'
    | '/visits'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/auth/login'
    | '/auth/signup'
    | '/patients/$patientId'
    | '/visits/$visitId'
    | '/visits/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutLazyRoute: typeof AboutLazyRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthSignupRoute: typeof AuthSignupRoute
  PatientsPatientIdRoute: typeof PatientsPatientIdRoute
  VisitsVisitIdRoute: typeof VisitsVisitIdRoute
  VisitsIndexRoute: typeof VisitsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutLazyRoute: AboutLazyRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthSignupRoute: AuthSignupRoute,
  PatientsPatientIdRoute: PatientsPatientIdRoute,
  VisitsVisitIdRoute: VisitsVisitIdRoute,
  VisitsIndexRoute: VisitsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/auth/login",
        "/auth/signup",
        "/patients/$patientId",
        "/visits/$visitId",
        "/visits/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/signup": {
      "filePath": "auth/signup.tsx"
    },
    "/patients/$patientId": {
      "filePath": "patients/$patientId.tsx"
    },
    "/visits/$visitId": {
      "filePath": "visits/$visitId.tsx"
    },
    "/visits/": {
      "filePath": "visits/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
