function twd97ToLatlng($x, $y) {
    let pow = Math.pow, M_PI = Math.PI;
    let sin = Math.sin, cos = Math.cos, tan = Math.tan;
    let $a = 6378137.0, $b = 6356752.314245;
    let $lng0 = 121 * M_PI / 180, $k0 = 0.9999, $dx = 250000, $dy = 0;
    let $e = pow((1 - pow($b, 2) / pow($a, 2)), 0.5);

    $x -= $dx;
    $y -= $dy;

    let $M = $y / $k0;

    let $mu = $M / ($a * (1.0 - pow($e, 2) / 4.0 - 3 * pow($e, 4) / 64.0 - 5 * pow($e, 6) / 256.0));
    let $e1 = (1.0 - pow((1.0 - pow($e, 2)), 0.5)) / (1.0 + pow((1.0 - pow($e, 2)), 0.5));

    let $J1 = (3 * $e1 / 2 - 27 * pow($e1, 3) / 32.0);
    let $J2 = (21 * pow($e1, 2) / 16 - 55 * pow($e1, 4) / 32.0);
    let $J3 = (151 * pow($e1, 3) / 96.0);
    let $J4 = (1097 * pow($e1, 4) / 512.0);

    let $fp = $mu + $J1 * sin(2 * $mu) + $J2 * sin(4 * $mu) + $J3 * sin(6 * $mu) + $J4 * sin(8 * $mu);

    let $e2 = pow(($e * $a / $b), 2);
    let $C1 = pow($e2 * cos($fp), 2);
    let $T1 = pow(tan($fp), 2);
    let $R1 = $a * (1 - pow($e, 2)) / pow((1 - pow($e, 2) * pow(sin($fp), 2)), (3.0 / 2.0));
    let $N1 = $a / pow((1 - pow($e, 2) * pow(sin($fp), 2)), 0.5);

    let $D = $x / ($N1 * $k0);

    let $Q1 = $N1 * tan($fp) / $R1;
    let $Q2 = (pow($D, 2) / 2.0);
    let $Q3 = (5 + 3 * $T1 + 10 * $C1 - 4 * pow($C1, 2) - 9 * $e2) * pow($D, 4) / 24.0;
    let $Q4 = (61 + 90 * $T1 + 298 * $C1 + 45 * pow($T1, 2) - 3 * pow($C1, 2) - 252 * $e2) * pow($D, 6) / 720.0;
    let $lat = $fp - $Q1 * ($Q2 - $Q3 + $Q4);

    let $Q5 = $D;
    let $Q6 = (1 + 2 * $T1 + $C1) * pow($D, 3) / 6;
    let $Q7 = (5 - 2 * $C1 + 28 * $T1 - 3 * pow($C1, 2) + 8 * $e2 + 24 * pow($T1, 2)) * pow($D, 5) / 120.0;
    let $lng = $lng0 + ($Q5 - $Q6 + $Q7) / cos($fp);

    $lat = ($lat * 180) / M_PI;
    $lng = ($lng * 180) / M_PI;

    return {
        lat: $lat,
        lng: $lng
    };
}

export{twd97ToLatlng}