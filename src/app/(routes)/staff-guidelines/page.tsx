import { Users2, Wifi, Dumbbell } from 'lucide-react'

export default function StaffGuidelinesPage() {
  return (
    <div className="max-w-[1024px] mx-auto py-8">
      <div className="flex items-center justify-between mb-8 px-4 sm:px-0">
        <h1 className="text-3xl font-bold mayopi-title">스텝 생활 가이드라인</h1>
      </div>

      {/* 네비게이션 버튼 */}
      <div className="mb-8 flex flex-wrap gap-2 px-4 sm:px-0">
        <a href="#basic-info" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          기본 정보
        </a>
        <a href="#life-rules" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          생활 규칙
        </a>
        <a href="#facilities" className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF6B35] rounded-lg transition-colors">
          시설 이용
        </a>
      </div>

      <div className="space-y-6 px-4 sm:px-0">
        <div id="basic-info" className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-card-title">기본 정보</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">와이파이</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>mayopi, mayopi5G</li>
                  <li>301302m!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id="life-rules" className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <Users2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-card-title">생활 규칙</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">취침 시간</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>오후 11시 소등</li>
                  <li>11시 이후 활동 시 멤버들에게 미리 연락 및 동의 구하기</li>
                  <li>개인 업무, 노트북 사용, 전화통화는 옆방 또는 1층에서 진행</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">개인 물품 및 식사</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>타인의 개인용품은 허락 없이 사용 금지</li>
                  <li>방 안에서 음식 섭취 시 다른 멤버들의 동의 필요</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">쓰레기 처리</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>방/욕실 쓰레기: 모아지면 돌아가며 1주에 1번 배출</li>
                  <li>분리수거: 개인적으로 즉시 배출</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">욕실 사용</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>사용 후 하수구 머리카락, 세면대 정리 및 청소</li>
                  <li>사용한 수건은 방 건조대에 걸어두고 다음날 세탁실에 배출</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">공용 물품 관리</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>고데기: 사용 시 트레이 위에 놓고 전원 켜기</li>
                  <li>휴지, 쓰레기봉투, 수건, 롤러, 크리너, 물티슈 등: 떨어지기 전에 미리 채워놓기</li>
                  <li>드라이기: 사용 후 돌돌이로 머리카락 정리</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">온도 관리</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>겨울철 보일러: 23도 (오전 11시~5시까지 끄기)</li>
                  <li>여름철 에어컨: 26도 (사용하지 않을 때 반드시 끄기)</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">청소</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>2층 단체 청소: 주 1회 (스텝룸, 옆방, 운동 공간 포함)</li>
                  <li>방 내부 구석 물받이통: 청소 시마다 비우기 (곰팡이 예방)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id="facilities" className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 mayopi-gradient rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <h2 className="mayopi-card-title">시설 이용</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">운동 기구 및 바디프렌즈</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>바디프렌즈: 엉덩이부터 앉고 다리 집어넣기</li>
                  <li>사용 후 전원 끄기</li>
                  <li>모든 기계는 한 타임씩만 사용 (다음 사용자 배려)</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">자전거 이용</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>출발 전 상태 점검 (타이어 공기, 안장/핸들 높이)</li>
                  <li>돌아올 수 있는 동선으로 계획 (어두워지기 전 귀가)</li>
                  <li>안전 운전 필수</li>
                  <li>자물쇠 비밀번호: 2738</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium mb-2 text-[#FF6B35]">마요피갤러리 카페</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>객실 손님을 위해 가장자리에서 작업</li>
                  <li>2명 이상일 경우 한쪽에 모여 앉기</li>
                  <li>손님이 많을 때는 자리 양보하기</li>
                  <li>이용 후 냉난방기 끄기 (겨울 23도/여름 26도)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 