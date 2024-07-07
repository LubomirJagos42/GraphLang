<?php

$pattern = '/([^a-zA-Z0-9\.])#([^a-zA-Z0-9\.])/';
$replacement = "$1?$2";
$subject = "this is random Arduino#Add#File#= some other text\n";
$subject .= "This is new line #where# there #= #$\n";
$subject .= '# aaaa # another "#" line'."\n";
$subject .= "# aaaa # another '#' line"."\n";
$subject .= "# aaaa # another '_#_' line"."\n";
$subject .= '# aaaa # another "_#_" line'."\n";
$subject .= '# aaaa # another ".#." line'."\n";
$outputStr = preg_replace($pattern, $replacement, $subject);

echo("ORIGINAL: ".$subject."\n");
echo("\n");
echo("RESULT: ".$outputStr."\n");

?>