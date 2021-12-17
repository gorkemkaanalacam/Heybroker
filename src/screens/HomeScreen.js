import { Button } from 'react-native-rapi-ui';
import React, { useContext, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Image, Touchable, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/ContextProvider';
import { SliderBox } from 'react-native-image-slider-box';
import LoadingModal from '../components/LoadingModal';
import * as Linking from 'expo-linking';
import { ChangeLocalizationLang } from '../helpers/Localization';
import { colors } from '../constants';
import i18n from 'i18n-js';

export default HomeScreen = ({ navigation }) => {
  const [sliderList, setSliderList] = useState([]);
  const [sliderImageList, setSliderImageList] = useState([]);
  const { state } = useContext(AuthContext);

  const fetchSliderList = () => {
    fetch('https://api.heybrokers.com/Slider/List', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + state.userToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setSliderList(response.data);
        setSliderImageList(response.data.map((x) => x.url));
      });
  };

  useEffect(() => {
    fetchSliderList();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {sliderImageList && (
        <SliderBox
          sliderBoxHeight={100}
          autoplay
          circleLoop
          images={sliderImageList}
          onCurrentImagePressed={(index) =>
            Linking.openURL(sliderList[index].link)
          }
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.jumpTo("QuestionsNav")}>
          <Image style={{ height: 80, resizeMode: 'contain' }} source={require('../../assets/asktocome.png')} />
        </TouchableOpacity>
        {/* <Button
          text={i18n.t("welcome")}
          status="primary"
          style={{ flex: 1 }}
          onPress={() => ChangeLocalizationLang("tr")}
        />
        <View style={{ marginHorizontal: 5 }}></View>
        <Button
          text="Takvim"
          status="success"
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('Calendar')}
        />
        <View style={{ marginHorizontal: 5 }}></View>
        <Button
          text="Haberler"
          status="info"
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('News')}
        /> */}
      </View>
      <WebView
        style={{ flex: 1, backgroundColor: '#1E222D' }}
        allowsLinkPreview={false}
        source={{
          html: `<!doctype html>
          <html lang="en" style="height:100%; padding:0; margin:0;">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body style="height:100%; padding:0; margin:0;">
            <!-- TradingView Widget BEGIN -->
          <div class="tradingview-widget-container" style="height:100%; padding:0; margin:0;">
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js" async>
            {
            "colorTheme": "dark",
            "dateRange": "12M",
            "showChart": true,
            "locale": "tr",
            "largeChartUrl": "",
            "isTransparent": false,
            "showSymbolLogo": true,
            "showFloatingTooltip": false,
            "width": "100%",
            "height": "100%",
            "plotLineColorGrowing": "rgba(0, 255, 255, 1)",
            "plotLineColorFalling": "rgba(255, 0, 255, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(120, 123, 134, 1)",
            "belowLineFillColorGrowing": "rgba(66, 66, 66, 0.12)",
            "belowLineFillColorFalling": "rgba(0, 0, 0, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(0, 255, 255, 0.12)",
            "tabs": [
              {
                "title": "Crypto",
                "symbols": [
                  {
                    "s": "COINBASE:BTCUSD",
                    "d": "BTCUSD"
                  },
                  {
                    "s": "BITFINEX:ETHUSD",
                    "d": "ETHUSD"
                  },
                  {
                    "s": "CURRENCYCOM:XRPUSD",
                    "d": "XRPUSD"
                  },
                  {
                    "s": "CRYPTOCAP:ADA",
                    "d": "ADAUSD"
                  },
                  {
                    "s": "BITFINEX:AVAXUSD",
                    "d": "AVAXUSD"
                  },
                  {
                    "s": "COINBASE:DOGEUSD",
                    "d": "DOGEUSD"
                  },
                  {
                    "s": "BITFINEX:LINKUSD",
                    "d": "LINKUSD"
                  },
                  {
                    "s": "BITFINEX:LUNAUSD",
                    "d": "LUNAUSD"
                  },
                  {
                    "s": "BITFINEX:XLMUSD",
                    "d": "XKLMUSD"
                  },
                  {
                    "s": "EIGHTCAP:HOTUSD",
                    "d": "HOTUSD"
                  },
                  {
                    "s": "BINANCE:TRXUSDT",
                    "d": "TRONUSDT"
                  },
                  {
                    "s": "COINBASE:MANAUSD",
                    "d": "MANAUSD"
                  },
                  {
                    "s": "FTX:SANDUSD",
                    "d": "SANDUSD"
                  },
                  {
                    "s": "BITFINEX:LTCUSD",
                    "d": "LITEUSD"
                  },
                  {
                    "s": "COINBASE:DOTUSD",
                    "d": "DOTUSD"
                  },
                  {
                    "s": "COINBASE:CROUSD",
                    "d": "CROUSD"
                  },
                  {
                    "s": "COINBASE:BCHUSD",
                    "d": "BCHUSD"
                  },
                  {
                    "s": "COINBASE:UNIUSD",
                    "d": "UNIUSD"
                  },
                  {
                    "s": "COINBASE:ALGOUSD",
                    "d": "ALGOUSD"
                  },
                  {
                    "s": "BINANCEUS:AXSUSD",
                    "d": "AXSUSD"
                  },
                  {
                    "s": "BITFINEX:BTTUSD",
                    "d": "BTTUSD"
                  },
                  {
                    "s": "COINBASE:GALAUSD",
                    "d": "GALAUSD"
                  },
                  {
                    "s": "COINBASE:MATICUSD",
                    "d": "MATICUSD"
                  },
                  {
                    "s": "KRAKEN:ADAUSD",
                    "d": "CARDANOUSD"
                  },
                  {
                    "s": "COINBASE:SHIBUSD",
                    "d": "SHIBUSD"
                  },
                  {
                    "s": "EIGHTCAP:CAKEUSD",
                    "d": "CAKEUSD"
                  },
                  {
                    "s": "COINBASE:ATOMUSD",
                    "d": "ATOMUSD"
                  },
                  {
                    "s": "BINANCE:THETAUSDT",
                    "d": "THETAUSDT"
                  },
                  {
                    "s": "BITTREX:BNAUSDT",
                    "d": "BNAUSDT"
                  }
                ]
              },
              {
                "title": "Worldwide Indices",
                "symbols": [
                  {
                    "s": "BIST:XU100",
                    "d": "BIST 100"
                  },
                  {
                    "s": "BIST:XU050",
                    "d": "BIST 50"
                  },
                  {
                    "s": "BIST:XU030",
                    "d": "BIST 30"
                  },
                  {
                    "s": "DJ:DJI",
                    "d": "DOW JONES"
                  },
                  {
                    "s": "SKILLING:DJ30",
                    "d": "DOW JONES 30"
                  },
                  {
                    "s": "SP:SPX",
                    "d": "SNP 500"
                  },
                  {
                    "s": "SKILLING:NASDAQ",
                    "d": "NASDAQ 100"
                  },
                  {
                    "s": "GLOBALPRIME:US2000",
                    "d": "RUSSEL 2000"
                  },
                  {
                    "s": "BMFBOVESPA:IBOV",
                    "d": "BOVESPA"
                  },
                  {
                    "s": "XETR:DAX",
                    "d": "DAX"
                  },
                  {
                    "s": "CURRENCYCOM:UK100",
                    "d": "FTSE 100"
                  },
                  {
                    "s": "INDEX:CAC40",
                    "d": "CAC 40"
                  },
                  {
                    "s": "CURRENCYCOM:EU50",
                    "d": "EURO STOXX 50"
                  },
                  {
                    "s": "EURONEXT:AEX",
                    "d": "AEX"
                  },
                  {
                    "s": "BME:IBC",
                    "d": "IBEX 35"
                  },
                  {
                    "s": "SIX:SMI",
                    "d": "SMI"
                  },
                  {
                    "s": "EURONEXT:PSI20",
                    "d": "PSI 20"
                  },
                  {
                    "s": "EURONEXT:BEL20",
                    "d": "BEL 20"
                  },
                  {
                    "s": "XETR:2756",
                    "d": "ATX"
                  },
                  {
                    "s": "OMXSTO:OMXS30",
                    "d": "OMXS 30"
                  },
                  {
                    "s": "MOEX:IMOEX",
                    "d": "MOEX"
                  },
                  {
                    "s": "MOEX:RTSI",
                    "d": "RTSI"
                  },
                  {
                    "s": "TASE:TA35",
                    "d": "TA - 35"
                  },
                  {
                    "s": "TADAWUL:TASI",
                    "d": "TADAWUL"
                  },
                  {
                    "s": "TVC:NI225",
                    "d": "NIKKEI"
                  },
                  {
                    "s": "SSE:000062",
                    "d": "SHANGAI"
                  },
                  {
                    "s": "SZSE:399106",
                    "d": "SZSE"
                  },
                  {
                    "s": "OANDA:CN50USD",
                    "d": "CHINA A50"
                  },
                  {
                    "s": "TVC:HSI",
                    "d": "HANG SENG"
                  },
                  {
                    "s": "OANDA:TWIXUSD",
                    "d": "TAIWAN"
                  },
                  {
                    "s": "KRX:KOSPI",
                    "d": "KOSPI"
                  },
                  {
                    "s": "IDX:IDX30",
                    "d": "IDX 30 "
                  },
                  {
                    "s": "NSE:NIFTY",
                    "d": "NIFTY 50"
                  },
                  {
                    "s": "BSE:SENSEX",
                    "d": "SNP BSE SENSEX"
                  },
                  {
                    "s": "HOSE:VN30",
                    "d": "VN 30"
                  },
                  {
                    "s": "TVC:DXY",
                    "d": "DOLLAR INDEX"
                  },
                  {
                    "s": "CRYPTOCAP:BTC.D",
                    "d": "BTC DOMINANCE"
                  },
                  {
                    "s": "CURRENCYCOM:US100",
                    "d": "US 100"
                  },
                  {
                    "s": "CRYPTOCAP:TOTAL",
                    "d": "CRYPTO TOTAL MARKET"
                  },
                  {
                    "s": "QSE:DQAS",
                    "d": "NASDAQ DUBAI KATAR"
                  }
                ]
              },
              {
                "title": "Currency",
                "symbols": [
                  {
                    "s": "FX:EURUSD",
                    "d": "EURUSD"
                  },
                  {
                    "s": "FX:GBPUSD",
                    "d": "GBPUSD"
                  },
                  {
                    "s": "FX:EURGBP",
                    "d": "EURGBP"
                  },
                  {
                    "s": "FX:USDTRY",
                    "d": "USDTRY"
                  },
                  {
                    "s": "FX:EURTRY",
                    "d": "EURTRY"
                  },
                  {
                    "s": "FX_IDC:GBPTRY",
                    "d": "GBPTRY"
                  },
                  {
                    "s": "FX_IDC:CNYTRY",
                    "d": "CNYTRY"
                  },
                  {
                    "s": "FX_IDC:JPYTRY",
                    "d": "JPYTRY"
                  },
                  {
                    "s": "FX_IDC:CHFTRY",
                    "d": "CHFTRY"
                  },
                  {
                    "s": "OANDA:GBPJPY",
                    "d": "GBPJPY"
                  },
                  {
                    "s": "FX:AUDJPY",
                    "d": "AUDJPY"
                  },
                  {
                    "s": "OANDA:EURJPY",
                    "d": "EURJPY"
                  },
                  {
                    "s": "FX:CADJPY",
                    "d": "CADJPY"
                  },
                  {
                    "s": "OANDA:NZDJPY",
                    "d": "NZDJPY"
                  },
                  {
                    "s": "FX:NZDUSD",
                    "d": "NZDUSD"
                  },
                  {
                    "s": "FX:USDCAD",
                    "d": "USDCAD"
                  },
                  {
                    "s": "FX:USDCHF",
                    "d": "USDCHF"
                  },
                  {
                    "s": "FOREXCOM:USDRUB",
                    "d": "USDRUB"
                  },
                  {
                    "s": "FX:USDJPY",
                    "d": "USDJPY"
                  },
                  {
                    "s": "FX:AUDUSD",
                    "d": "AUDUSD"
                  },
                  {
                    "s": "FX:GBPAUD",
                    "d": "GBPAUD"
                  },
                  {
                    "s": "FX:EURAUD",
                    "d": "EURAUD"
                  },
                  {
                    "s": "FX_IDC:USDCNY",
                    "d": "USDCNY"
                  },
                  {
                    "s": "FX_IDC:EURCNY",
                    "d": "EURCNY"
                  },
                  {
                    "s": "FX:EURCAD",
                    "d": "EURCAD"
                  },
                  {
                    "s": "FX_IDC:EURALL",
                    "d": "EURLEK"
                  },
                  {
                    "s": "FX_IDC:USDALL",
                    "d": "USDLEK"
                  },
                  {
                    "s": "FX_IDC:USDESP",
                    "d": "USDESP"
                  }
                ]
              },
              {
                "title": "Commodity",
                "symbols": [
                  {
                    "s": "FOREXCOM:XAUUSD",
                    "d": "GOLDUSD"
                  },
                  {
                    "s": "OANDA:XAUEUR",
                    "d": "GOLDEUR"
                  },
                  {
                    "s": "OANDA:XAUAUD",
                    "d": "GOLDAUD"
                  },
                  {
                    "s": "FX_IDC:XAUTRYG",
                    "d": "GOLDTRY"
                  },
                  {
                    "s": "BITFINEX:XAUTBTC",
                    "d": "GOLDBTC"
                  },
                  {
                    "s": "OANDA:XAUXAG",
                    "d": "GOLDSILVER"
                  },
                  {
                    "s": "FX_IDC:XAUTRYG",
                    "d": "GRAMTRY"
                  },
                  {
                    "s": "FX_IDC:XAGTRYG",
                    "d": "GRAMSILVERTRY"
                  },
                  {
                    "s": "TVC:XAUBTCG",
                    "d": "GRAMBTCTRY"
                  },
                  {
                    "s": "FX_IDC:XAGTRY",
                    "d": "SILVERTRY"
                  },
                  {
                    "s": "FX_IDC:USDWTI",
                    "d": "USDWTI"
                  },
                  {
                    "s": "FX_IDC:USDBRO",
                    "d": "USDBRENT"
                  },
                  {
                    "s": "OANDA:XPDUSD",
                    "d": "PALLADIUMUSD"
                  },
                  {
                    "s": "FX_IDC:XPDEUR",
                    "d": "PALLADIUMEUR"
                  },
                  {
                    "s": "FX_IDC:XPTUSD",
                    "d": "PLATINUMUSD"
                  },
                  {
                    "s": "FX_IDC:XPTEUR",
                    "d": "PLATINUMEUR"
                  },
                  {
                    "s": "GLOBALPRIME:XCUUSD",
                    "d": "CUPPERUSD"
                  }
                ]
              }
            ]
          }
            </script>
          </div>
          <!-- TradingView Widget END -->
          
            </body>
          </html>`,
        }}
        renderLoading={() => <LoadingModal loading={true} />}
        startInLoadingState={true}
      />
      {/* <Button text="Sign out" onPress={signOut} /> */}
    </View>
  );
};
