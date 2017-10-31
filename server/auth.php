<?php
foreach (getallheaders() as $name => $value) {
    if ($name != "quanganh9x" && $value != "quanganh9x") die("Bad request detected!");
}
?>