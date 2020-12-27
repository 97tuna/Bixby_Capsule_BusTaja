# Bixby Capsule "버스타자"
<!-- Made By     : 2_tuna_97 -->

<!-- 빅스비 크루 로고 -->
<p align="center">
    <img width="300px" src="https://user-images.githubusercontent.com/50114556/103166141-8331b580-4862-11eb-810f-279c94adc030.png">
</p>

<!-- 숭실대 Bixby Crew사진 -->
<p align="center">
    <img width="300px" src="https://user-images.githubusercontent.com/50114556/103166155-9d6b9380-4862-11eb-92d7-397f2505e456.jpg">
</p>

<!-- 이미지 -->
<p align="center">
 <img src="https://img.shields.io/badge/build-passing-success">
 <img src="https://img.shields.io/badge/platform-Bixby-blue">
 <img src="https://img.shields.io/badge/version-2.1.9-important">
 <img src="https://img.shields.io/badge/language-javascript-yellow">
 <img src="https://img.shields.io/badge/license-MIT-green">
</p>

<!-- Capsule Store사진 -->
<p align="center">
    <img width="500px" src="https://user-images.githubusercontent.com/50114556/103166157-ac524600-4862-11eb-93c6-1dff5e7d9409.jpg">
</p>

## Capsule Structure
---
> Bixby Capsule은 다음과 같이 3가지로 구성되어 있습니다.
1. javascript <br>
    여기서는 액션에서 받은 정보를 가지고 정보를 실행 또는 처리하는것인데요. API를 사용해서 정보를 받아오거나 이미 저장되어있는 데이터 값을 불러오는 등 다양한 역할을 하게 됩니다.

2. Models <br>
    Bixby의 뼈대를 이루고 있으며 `Action`과 `Concept`로 이루어져 있습니다.
    `Action`은 `input`을 받아서 js에 기능을 실행해라 하는 명령을 내리게 됩니다. 그럼 js에서 데이터값, 즉 정보를 받아 컨셉으로 전달합니다. <br>
    `Concept`은 개념은 프로그래밍 할때의 변수 유형 및 구조와 비슷합니다.
    ```
    boolean - true, false
    decimal - 소수
    enum - 사전을 구축하기 위해 사용할 수 있는 문자열 중 하나(name, text와 같은 개념)
    name - 유니코드 사용 변수이름
    integer - 소수빼고 모든 수
    qualified - 정규식, 패턴
    ```

3. Layout & Traning <br>
    js에서 받아서 컨셉에 저장되어있는 정보를 어떻게 보여줄지에 대한 부분이 `Layout`이며, 사용자의 발화를 정확하게 인식하여 어떤 기능을 실행할 지에 대한 지표가 되는 부분입니다. <br> `Goal`은 어느 정보를 `output`으로 둘건지 설정이고 두번째는 앞서 말했던 `input` 값입니다. 사용자가 발화할 때 빅스비가 어떤 부분에서 인식해야하는지에 대한 지표.

<br>

## 사용한 API
* [서울 버스 위치 정보 조회 API](https://data.seoul.go.kr/dataList/OA-1093/L/1/datasetView.do)
* [서울시 버스도착 정보 조회](http://data.seoul.go.kr/dataList/OA-1091/L/1/datasetView.do)
* 카카오 지도 연동

<br>

## Capsule update시 갱신할 부분
---
### capsule.bxb
```javascript
capsule {
	id (playground.finalBus) //활용도를 만족시키기 위한 playground설정
	version (2.1.9) // Store에서 update & submit하려면 매번 버전을 업그레이드 하여야 함. 동일버전은 승인 X
	format (3)
	targets {
		target (bixby-mobile-ko-KR) //사용 언어 선택
		target (bixby-mobile-en-US) {enabled (false)}
	}

  capsule-imports {
    import (viv.core){ as (core)}
    import (viv.geo) {
      as (geo)
      version (9.27.15) // viv.core에서 update참고하여 수정 할 것
    }
    import (viv.self) {
      as (self)
      version (4.0.20) // viv.core에서 update참고하여 수정 할 것
    }
  }

	permissions { // 유저의 권한을 받아오기 위한 장소, capsule-info.bxb와 연동해야함
    device-location-access
    library-permission (self:profile)
  }
	
	runtime-version (8) { //업데이트 시 Fix할 것
	}
	
	store-countries { //Store Open 장소
		only {
			allow (KR)
		}
	}
	store-sections { //Store Section 선택
		section (TravelAndTransportation)
		section (Local) {
			visibility-constraints {
				country-constraints {
					allowed-list {
	  				allow (KR)
					}
				}
			}
		}
	}
}
```

> [viv.core 버전 업데이트 명시](https://bixbydevelopers.com/dev/docs/dev-guide/developers/library)

<br>

### capsule-info.bxb
```javascript
capsule-info{
  ...
  display-name (버스타자)
  developer-name (Bixby Crew)
  ...
  description ("▶︎ 버스 검색!! 이제는 편하게 빅스비로 물어보세요 ◀︎ \n\n ▶︎ 업데이트로 정류장 위치 지도표시 및 혼잡도 제공 ◀︎ \n\n 주변 버스정류장의 실시간 운행정보와 특정 버스가 지나가는 주변 정류장을 알려줍니다. \n\n ❖ 아직 서울지역만 완료되어 있습니다. 곧 인천 및 경기가 지원 예정입니다. 더 많은 지역을 지원하기 위해 노력하겠습니다:)")
  ...
  dispatch-name (버스타자)
  dispatch-aliases {
    alias (버스 타자)
  }

  requested-permissions { //유저 권한 획득
    permission (device-location-access) {
      justification (Your location will be used to find)
    }
      permission (self:profile) {
      justification (Profile)
    }
  }
}

```


## Usage (대표 발화)
---
* "751번 버스 어디있어?"
* "동작 14번 타려면 어디서 타야해?"
* "주변 버스 정류장 알려줘"

본 캡슐은 발화에 따라 두가지의 `Action`으로 동작합니다. <br>
`SearchBus`와 `SearchNearStation`이며 특정 버스 번호를 찾을 때(ex, 751번 어디있어)에서는 `SearchBus`를 찾아가며 사용자가 주변 버스 정류장을 찾게 되면 `SearchNearStation`을 실행하게 됩니다.

## Award
* Bixby Capsule challenge Season 1 **심사위원 특별언급**

## 개발에 참고해야하는 사이트
* [https://bixbydevelopers.com](https://bixbydevelopers.com)

## Developer (Bixby Crew SSU)
* [2_tuna_97](https://github.com/97tuna)
* [tony9402](https://github.com/tony9402)
* [ika9810](https://github.com/ika9810)
* dldudwns

<!-- 2020.12.27(SUN) [MOD] update README.md -->