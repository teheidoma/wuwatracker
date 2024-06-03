/**
 * Creates a script the user must copy-paste to get their Convene History URL.
 *
 * @param gamePath - their Wuthering Waves installation directory containing `Wuthering Waves.exe` and the `Client` directory.
 * @returns a string containing the script the user will paste & run into PowerShell
 */
export default function createImportScript(gamePath: string) {
  return `$regpath='HKLM:\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\KRInstall Wuthering Waves Overseas';$gamePath='';if((Test-Path -LiteralPath $regpath) -eq $false){echo "Couldn't determine game path, please enter it manually";do{$tmpPath=Read-Host "(for example C:\\Program Files\\Epic Games\\WutheringWavesj3oFh): ";}until(Test-Path "$tmpPath\Wuthering Waves Game");$gamePath = $tmpPath;}else{$gamePath=$((Get-ItemProperty -Path $regpath -n InstallPath).InstallPath);}$logFile="$gamePath\\Wuthering Waves Game\\Client\\Saved\\Logs\\Client.log";if(-not(Test-Path $logFile)){Write-Host "\`nThe file '$logFile' does not exist." -ForegroundColor Red;Write-Host "Did you set your Game Installation Path properly?" -ForegroundColor Magenta;Read-Host "Press any key to exit";exit}$latestUrlEntry=Get-Content $logFile|Select-String "https://aki-gm-resources-oversea.aki-game.net"|Select-Object -Last 1;if($null-ne $latestUrlEntry){$urlPattern='url":"(.*?)"';$url=[regex]::Match($latestUrlEntry.ToString(),$urlPattern).Groups[1].Value;if($url){Write-Host "\`nConvene Record URL: $url";Set-Clipboard $url;Write-Host "\`nURL copied to clipboard. Please paste to Wuwa Tracker and click the Import History button." -ForegroundColor Green}else{Write-Host "No URL found."}}else{Write-Host "\`nNo matching entries found in the log file. Please open your Convene History first!" -ForegroundColor Red}`;
}
