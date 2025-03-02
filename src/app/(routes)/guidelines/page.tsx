import { Clock, Home, Trash, CheckSquare2, Waves, ClipboardCheck, Bed, Bath, Box, Shirt } from 'lucide-react'

export default function GuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="mayopi-title">객실 청소 가이드라인</h1>
      
      {/* 네비게이션 버튼 */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-2">
        <a href="#preparation" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          청소 준비물
        </a>
        <a href="#before-cleaning" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          청소 시작 전 준비
        </a>
        <a href="#bathroom" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          화장실 청소
        </a>
        <a href="#room" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          객실 청소
        </a>
        <a href="#laundry" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          세탁 및 건조
        </a>
        <a href="#finishing" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          마무리 작업
        </a>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div id="preparation" className="mayopi-card p-6 scroll-mt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <CheckSquare2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-subtitle">청소 준비물</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">청소도구</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>청소 바구니</li>
                  <li>돌돌이(먼지제거기)</li>
                  <li>검은 비닐봉투 (방당 2개씩)</li>
                  <li>청소 티슈/곰팡이 제거제</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">걸레 종류와 용도</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>청소포 - 변기 전용</li>
                  <li>반들반들한 하늘색 걸레 - 창문, 거울, 화장실 유리 닦기용</li>
                  <li>갈색 걸레(막걸레) - 세면대 물기, 현관문, 화장실 바닥, 현관 바닥</li>
                  <li>하늘색, 분홍색 걸레 - 위를 제외한 나머지 부분</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">1인실 세트</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-[#FF6B35] mb-1">세탁실</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>이불 1개</li>
                      <li>매트커버 1개</li>
                      <li>수건 2개</li>
                      <li>베게커버 1개</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-[#FF6B35] mb-1">카페동</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>샤워타월 1개</li>
                      <li>치약 1개, 칫솔 1개</li>
                      <li>샴푸, 린스, 바디워시 각 1개</li>
                      <li>종이컵 1개</li>
                      <li>사각갈색휴지 2개</li>
                      <li>두루마리휴지 1개</li>
                      <li>물 2개</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">2인실 세트</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-[#FF6B35] mb-1">세탁실</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>이불 1개</li>
                      <li>매트커버 1개</li>
                      <li>수건 4개</li>
                      <li>베게커버 2개</li>
                      <li>베게</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-[#FF6B35] mb-1">카페동</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>샤워타월 2개</li>
                      <li>치약 2개, 칫솔 2개</li>
                      <li>샴푸, 린스, 바디워시 각 1개</li>
                      <li>종이컵 2개</li>
                      <li>사각갈색휴지 4개</li>
                      <li>두루마리휴지 1개</li>
                      <li>물 4개</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="before-cleaning" className="mayopi-card p-6 scroll-mt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <Bed className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-subtitle">청소 시작 전 준비</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <ul className="list-disc list-inside text-gray-600">
                  <li>창문 닫기</li>
                  <li>전체 소등</li>
                  <li>보일러 끄기</li>
                  <li>제습기 켜기</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="bathroom" className="mayopi-card p-6 scroll-mt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <Bath className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-subtitle">화장실 청소</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <ul className="list-disc list-inside text-gray-600">
                  <li>세면대 물기 제거</li>
                  <li>샤워기 뒤로 위치시키기</li>
                  <li>샤워 버튼 한 방향으로 정리</li>
                  <li>화장실 바닥 물기 제거</li>
                  <li>화장실 발판 청소</li>
                  <li>벽면 곰팡이 제거 (청소 티슈 사용)</li>
                  <li>금색 부품 모두 닦기</li>
                  <li>변기 청소 (필요시 칫솔 사용)</li>
                  <li>변기 뒤쪽 청소</li>
                  <li>변기 뚜껑 닫아놓기</li>
                  <li>화장실 거울 닦기</li>
                  <li>화장실 유리 청소</li>
                  <li>휴지 교체하기</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="room" className="mayopi-card p-6 scroll-mt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <Box className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-subtitle">객실 청소</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">침구 정리</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>매트리스 커버 정리</li>
                  <li>이불 펴고 이불커버 연결</li>
                  <li>베개 정리</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">가구 및 시설물</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>의자/책상 청소</li>
                  <li>옷걸이 한 방향으로 정리</li>
                  <li>선반 청소</li>
                  <li>벽면 먼지 제거</li>
                  <li>파랑 수건: 창문, 거울, TV, 큰 거울, 거울벽 닦기</li>
                  <li>분홍 수건: TV장, TV 뒤, 수건장, 냉장고(안쪽 포함) 닦기</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="laundry" className="mayopi-card p-6 scroll-mt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-subtitle">세탁 및 건조 가이드</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">기본 규칙</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>청소 마치고 나온 빨래 세탁 후 건조기로 옮기기</li>
                  <li>건조 정도 '강'으로 꼭 변경 후 건조</li>
                  <li>건조된 빨래는 다음날 청소팀이 정리</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">빨래 분리 지침</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-[#FF6B35] mb-1">매트커버, 이불커버 (3세트씩)</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>찬물 설정</li>
                      <li>헹굼 2회</li>
                      <li>탈수 강</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-[#FF6B35] mb-1">베개커버와 수건</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>온수 30도</li>
                      <li>헹굼 2회</li>
                      <li>수건 최대 30개 + 베개커버 5개까지 가능</li>
                      <li>방 하나분일 때만 수건, 베개커버 같이 세탁 가능</li>
                      <li>두 개 이상은 무조건 따로 세탁</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-[#FF6B35] mb-1">예시</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>빨래 6개 방분이 나왔다면:</li>
                      <li className="ml-4">1세트: 매트커버, 이불 각 3개씩</li>
                      <li className="ml-4">2세트: 매트커버, 이불 각 3개씩</li>
                      <li className="ml-4">3세트: 수건+베개커버</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="finishing" className="mayopi-card p-6 scroll-mt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-subtitle">마무리 작업</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">쓰레기 처리</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>분리수거 (비닐 따로)</li>
                  <li>휴지통 2개 비우기</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">최종 청소</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>막걸레로 세면대 주변 청소</li>
                  <li>화장실 바닥 최종 점검 (물기 없는지 확인)</li>
                  <li>현관문 닦기</li>
                  <li>돌돌이로 최종 먼지 제거</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">어메니티 준비</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>샴푸, 린스, 샤워젤 진열</li>
                  <li>컵 (막혀있는 방향으로 놓기)</li>
                  <li>생수 2병 배치</li>
                  <li>비닐 씌우기</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">입실 전 최종 점검</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>제습기 비우기</li>
                  <li>보일러 끄기</li>
                  <li>전체 소등</li>
                  <li>먼지 제거 확인</li>
                  <li>어메니티 확인 (수건, 물, 휴지, 드라이기 등)</li>
                  <li>침구 상태 확인</li>
                  <li>핸드워시 잔량 확인</li>
                  <li>화장실 문턱 청결 확인</li>
                  <li>현관 바닥 청결 확인</li>
                  <li>창문 손자국 없는지 확인</li>
                  <li>분리수거 확인</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">추가 체크사항</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>청소한 방 외에 당일 입실하는 방도 체크</li>
                  <li>체크 완료 후 톡방에 "입실체크 완료" 문자 보내기</li>
                  <li>카페동 물품 재고 확인
                    <ul className="list-disc list-inside ml-4">
                      <li>물, 수건 비어있으면 8개분 정도 재고 채우기</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 