<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    // DATA

    function contains($haystack, $needle)
    {
        return '' === $needle || false !== strpos($haystack, $needle);
    }

    $total_rows = 181;
    $result_amount = 0;
    $results_per_page = $_GET['resultsperpage'];
    $current_page = $_GET['page'];
    $start = 0 + ($results_per_page * ($current_page-1));
    $search = false;
    if (!empty($_GET['searchval'])) {
        $search = true;
    }

    // FILL
    $Result = array();
    $allData = array();
    for ($i=1; $i<=$total_rows; $i++) {
        $Row = array();
        $Row["id"] = $i;

        $Row["name"] = "Name".$i;

        if ($search) {
            if (contains($Row["name"], $_GET['searchval'])) {
                array_push($allData,$Row);
                $result_amount++;
            }
        } else {
            array_push($allData,$Row);
            $result_amount++;
        }
    }
    $Data = array_slice($allData,$start,$results_per_page);

    $Meta = array();
    $Meta["total_rows"] = $result_amount;
    $Meta["results_per_page"] = $results_per_page;
    $Meta["total_pages"] = ceil($result_amount/$results_per_page);
    $Meta["current_page"] = $current_page;

    // RETURN
    array_push($Result,$Data);
    array_push($Result,$Meta);
    echo json_encode($Result);
?>