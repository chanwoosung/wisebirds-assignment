# WiseBirds front-end development assignment

## 프로젝트 확인법

### yarn

`yarn` 을 통해 node module 설치 부탁드립니다.

### yarn start

`yarn start` 를 통해 화면을 시동시킬 수 있습니다.

## 개발 구현 중 중점적으로 집중한 사항

API가 구현되어 있지 않다는 가정하에, `React-Query` 등을 사용한 데이터 처리와 이에 대한 인터렉션을 집중하며 만들었습니다.
`Mutation` 을 통해 데이터가 수정되었다고 가정하여, 즉각적으로 화면에 데이터가 반영되는 것을 목표로 제작했습니다.

## 시나리오

맨 처음 화면에서 권한이 뷰어로 되어있습니다. GNB영역에서 권한을 수정해주시기 바랍니다.
사용자 관리 탭은 어드민으로 설정하셔야지만 가능합니다.

## 개발 미구현 사항

### 사용자 호출 기능

`GNB` 영역의 데이터를 호출하는 건가 싶어서 애매하여 api scheme은 있었으나 구현하지 않았습니다.

### 에러 핸들링

프로젝트 내부에 제시해주셨던 기본 데이터를 호출 후 finally에서 리턴하는 형태로 제작이 되어서 그런지
react-query `onError`, `onSettle` 옵션이 작동하지 않았습니다.
에러 바운더리에 의한 Error 처리를 구현하지 못했습니다.
