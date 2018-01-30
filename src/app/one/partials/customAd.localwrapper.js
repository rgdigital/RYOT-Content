<!-- inject: ./customAd.config.js-->
(function(B, G) {
    var E = B.adServerVars.id;

    function C(H) {
        return (G[H] && (typeof G[H][E] != "undefined"))
    }

    function F(H) {
        return G[H][E]
    }

    function A(g) {
        if (typeof g != "undefined") {
            E = g
        }
        var Q = "adServerVars";
        var c = "clickthroughs";
        var h = "contentVariables";
        var L = "dest";
        var T = "externalId";
        var R = "externalIds";
        var e = "id";
        var l = "thirdPartyTracking";
        var f = "url";
        var X = "secureUrl";
        var P = "assetContainers";
        var H = "pubVars";
        var Z = "iframeBuster";
        var d = "iframeBusterPath";
        var Y = "adtechFLPData";
        var M = "adtechFlightPlacementId";
        B[Y] = G;
        B[M] = E;
        if (C(c)) {
            var W = F(c);
            for (var V in B[c]) {
                if (B[c].hasOwnProperty(V)) {
                    if (W[V]) {
                        B[c][V][L] = W[V]
                    }
                }
            }
        }
        if (C(h)) {
            var J = F(h);
            for (var K in B[h]) {
                if (B[h].hasOwnProperty(K)) {
                    if (J[K]) {
                        B[h][K] = J[K]
                    }
                }
            }
        }
        if (C(l)) {
            var k = F(l);
            var S = B[l];
            for (var a = 0; a < S.length; a++) {
                var b = S[a];
                if (k[b[e]]) {
                    var O = k[b[e]];
                    if (O[f]) {
                        b[f] = O[f]
                    }
                    if (O[X]) {
                        b[X] = O[X]
                    }
                }
            }
        }
        if (C(P)) {
            var I = F(P);
            for (var N in B[P]) {
                if (B[P].hasOwnProperty(N)) {
                    var j = B[P][N];
                    for (var U in j) {
                        if (j.hasOwnProperty(U)) {
                            if (I[N] && I[N][U]) {
                                B[P][N][U] = I[N][U];
                                if (U == Z) {
                                    B[H][d] = I[N][U]
                                }
                            }
                        }
                    }
                }
            }
        }
        if (C(R)) {
            var m = F(R);
            if (B[Q].hasOwnProperty(T)) {
                if (m) {
                    B[Q][T] = m[T]
                }
            }
        }
    }
    if (typeof adtechIframeHashArray == "undefined") {
        A()
    } else {
        try {
            com.adtech.IframeUtils_$VERSION$.registerCallback(A)
        } catch (D) {
            if (window.console) {
                console.error("Failed to register flight config callback: " + D)
            }
        }
    }
}(adtechAdConfig, {
    "clickthroughs": {},
    "contentVariables": {},
    "thirdPartyTracking": {},
    "assetContainers": {},
    "externalIds": {
        "17085165": {
            "externalId": ""
        }
    }
}));

<!-- inject: ./customAd.wrapper.js-->

(function(D) {
    if (!D.initOverride) {
        var B = "http://ads.pictela.net/rm/lib/richmedia/";
        if (D.adServerVars.servingProto === "https") {
            var E = ["baseURL", "assetBaseURL"];
            for (var C = 0; C < E.length; C++) {
                var G = D.adServerVars[E[C]];
                if (G) { D.adServerVars[E[C]] = G.replace(/^http:\/\/[-a-z0-9\.]*\//i, "https://secure-ads.pictela.net/") } }
            B = "https://secure-ads.pictela.net/rm/lib/richmedia/" }
        var H = (D.mraidCompatible) ? "MRAID" : "";
        var F = B + "adtechRichMediaLib" + H + "_$VERSION$.js";
        D.rmLibUrl = F;
        if (!window.adtechAdManager_$VERSION$) {
            adtechAdQueue = window.adtechAdQueue || [];
            adtechAdQueue.push(D);
            if (!window.adtechAdManagerReqs || !window.adtechAdManagerReqs["$VERSION$"]) { adtechAdManagerReqs = window.adtechAdManagerReqs || {};
                adtechAdManagerReqs["$VERSION$"] = true;
                var A = "scr";
                document.write("<" + A + 'ipt type="text/javascript" src="' + F + '"></' + A + "ipt>") }
            } else {
                adtechAdManager_$VERSION$.registerAd(D)
            }
        }
})(adtechAdConfig);
