function i(){return`
    <!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container h-full w-full">
        <div class="tradingview-widget-container__widget-stat" style="height:700px;width:80%;margin: auto;"></div>
        <div class="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/symbols/BITSTAMP-BTCUSD/?exchange=BITSTAMP" 
               rel="noopener nofollow" 
               target="_blank">
                <span class="blue-text">BTCUSD chart by TradingView</span>
            </a>
        </div>
    </div>
    <!-- TradingView Widget END -->
    `}function a(){const t=document.querySelector(".tradingview-widget-container__widget-stat");if(t){const e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",e.innerHTML=JSON.stringify({allow_symbol_change:!0,calendar:!1,details:!0,hide_side_toolbar:!1,hide_top_toolbar:!1,hide_legend:!1,hide_volume:!1,hotlist:!0,interval:"1",locale:"en",save_image:!0,style:"1",symbol:"BITSTAMP:BTCUSD",theme:"dark",timezone:"Etc/UTC",backgroundColor:"#0F0F0F",gridColor:"rgba(242, 242, 242, 0.06)",watchlist:["SP:SPX","TVC:GOLD","BINANCE:BTCUSDT","NASDAQ:QQQ"],withdateranges:!0,compareSymbols:[{symbol:"BITSTAMP:ETHUSD",position:"SameScale"},{symbol:"CRYPTOCAP:USDT",position:"SameScale"},{symbol:"TVC:GOLD",position:"SameScale"},{symbol:"FX:GBPUSD",position:"SameScale"}],studies:[],autosize:!0}),t.appendChild(e)}}export{a as i,i as r};
//# sourceMappingURL=stat-CwrfErq9.js.map
