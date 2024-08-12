const RouteNames = {
    HOME : "home" as const ,
    SHOPPING : "shopping" as const,
    HOME_TAB: "home-tab" as const,
    BROWSER: "browser" as const
}

export type RootStackParamList = {
    [RouteNames.HOME_TAB]: undefined;
    [RouteNames.BROWSER]: { initialUrl: string };
    // [RouteNames.SHOPPING]: undefined;
    // [RouteNames.HOME]: undefined;
}


export default RouteNames