import React, { useState, useEffect } from 'react';
import { Heart, Wind, Brain, Coffee, Moon, Smile } from 'lucide-react';

export default function AnxietyReliefTool() {
  const [activeTab, setActiveTab] = useState('home');
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState('ready');
  const [gratitudeItems, setGratitudeItems] = useState([]);
  const [gratitudeInput, setGratitudeInput] = useState('');

  const techniques = [
    {
      id: 'breath',
      icon: Wind,
      title: 'Respiro 4-7-8',
      color: 'bg-blue-50 border-blue-200',
      description: 'Calma il sistema nervoso in 2 minuti',
      quick: true
    },
    {
      id: 'grounding',
      icon: Brain,
      title: 'Tecnica 5-4-3-2-1',
      color: 'bg-green-50 border-green-200',
      description: 'Riconnettiti al presente',
      quick: true
    },
    {
      id: 'gratitude',
      icon: Heart,
      title: 'Gratitudine',
      color: 'bg-pink-50 border-pink-200',
      description: 'Sposta il focus sul positivo',
      quick: false
    },
    {
      id: 'movement',
      icon: Coffee,
      title: 'Movimento',
      color: 'bg-orange-50 border-orange-200',
      description: 'Rilascia la tensione fisica',
      quick: false
    },
    {
      id: 'evening',
      icon: Moon,
      title: 'Routine Serale',
      color: 'bg-purple-50 border-purple-200',
      description: 'Per notti più tranquille',
      quick: false
    },
    {
      id: 'thoughts',
      icon: Smile,
      title: 'Pensieri Utili',
      color: 'bg-yellow-50 border-yellow-200',
      description: 'Frasi che aiutano davvero',
      quick: false
    }
  ];

  useEffect(() => {
    if (breathPhase === 'inhale') {
      const timer = setTimeout(() => setBreathPhase('hold'), 4000);
      return () => clearTimeout(timer);
    } else if (breathPhase === 'hold') {
      const timer = setTimeout(() => setBreathPhase('exhale'), 7000);
      return () => clearTimeout(timer);
    } else if (breathPhase === 'exhale') {
      const timer = setTimeout(() => {
        setBreathCount(breathCount + 1);
        if (breathCount < 3) {
          setBreathPhase('inhale');
        } else {
          setBreathPhase('complete');
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [breathPhase, breathCount]);

  const startBreathing = () => {
    setBreathCount(0);
    setBreathPhase('inhale');
  };

  const addGratitude = () => {
    if (gratitudeInput.trim()) {
      setGratitudeItems([...gratitudeItems, gratitudeInput]);
      setGratitudeInput('');
    }
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kit Anti-Ansia 🌸</h1>
        <p className="text-gray-600">Tecniche pratiche per quando ne hai bisogno</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800 font-medium mb-2">💡 Consiglio veloce</p>
        <p className="text-sm text-blue-700">Quando senti l'ansia salire, prova prima una tecnica rapida (⚡). Bastano 2-5 minuti.</p>
      </div>

      <div className="grid gap-4">
        {techniques.map(tech => {
          const Icon = tech.icon;
          return (
            <button
              key={tech.id}
              onClick={() => setActiveTab(tech.id)}
              className={`${tech.color} border-2 rounded-lg p-4 text-left hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      {tech.title}
                      {tech.quick && <span className="text-xs bg-white px-2 py-1 rounded">⚡ Veloce</span>}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{tech.description}</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderBreath = () => (
    <div className="space-y-6">
      <button onClick={() => setActiveTab('home')} className="text-blue-600 hover:underline mb-4">← Indietro</button>
      
      <h2 className="text-2xl font-bold text-gray-800">Respiro 4-7-8</h2>
      <p className="text-gray-600">Questa tecnica attiva il sistema nervoso parasimpatico, quello del rilassamento.</p>

      {breathPhase === 'ready' && (
        <div className="text-center space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Come funziona:</h3>
            <div className="text-left space-y-2 text-sm">
              <p>• Inspira dal naso per <strong>4 secondi</strong></p>
              <p>• Trattieni il respiro per <strong>7 secondi</strong></p>
              <p>• Espira dalla bocca per <strong>8 secondi</strong></p>
              <p className="mt-3 text-gray-600">Ripeteremo questo ciclo 4 volte.</p>
            </div>
          </div>
          <button
            onClick={startBreathing}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Inizia
          </button>
        </div>
      )}

      {(breathPhase === 'inhale' || breathPhase === 'hold' || breathPhase === 'exhale') && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">
            {breathPhase === 'inhale' && '🌬️'}
            {breathPhase === 'hold' && '⏸️'}
            {breathPhase === 'exhale' && '😌'}
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {breathPhase === 'inhale' && 'Inspira'}
            {breathPhase === 'hold' && 'Trattieni'}
            {breathPhase === 'exhale' && 'Espira'}
          </div>
          <p className="text-gray-600">Ciclo {breathCount + 1} di 4</p>
        </div>
      )}

      {breathPhase === 'complete' && (
        <div className="text-center space-y-6 bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-2xl font-bold text-gray-800">Ottimo lavoro!</h3>
          <p className="text-gray-600">Come ti senti ora?</p>
          <button
            onClick={() => setBreathPhase('ready')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ripeti l'esercizio
          </button>
        </div>
      )}
    </div>
  );

  const renderGrounding = () => (
    <div className="space-y-6">
      <button onClick={() => setActiveTab('home')} className="text-blue-600 hover:underline mb-4">← Indietro</button>
      
      <h2 className="text-2xl font-bold text-gray-800">Tecnica 5-4-3-2-1</h2>
      <p className="text-gray-600">Questa tecnica ti riporta al momento presente usando i tuoi sensi.</p>

      <div className="space-y-4">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            👀 <span>5 cose che VEDI</span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">Guarda intorno e nota 5 cose. Possono essere semplici: una penna, un colore, una forma...</p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            ✋ <span>4 cose che TOCCHI</span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">Senti la texture dei tuoi vestiti, della sedia, del tavolo, del tuo telefono...</p>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            👂 <span>3 cose che SENTI</span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">Chiudi gli occhi un momento. Rumori di fondo, la tua respirazione, suoni lontani...</p>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            👃 <span>2 cose che ANNUSI</span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">L'aria, un profumo, il tuo caffè, anche solo l'odore neutro della stanza...</p>
        </div>

        <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            👅 <span>1 cosa che GUSTI</span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">Il sapore in bocca, oppure bevi un sorso d'acqua e nota davvero il sapore...</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-gray-700">💫 Prenditi tutto il tempo che ti serve. Non c'è fretta. L'ansia vive nel futuro e nel passato - questa tecnica ti riporta qui, ora.</p>
      </div>
    </div>
  );

  const renderGratitude = () => (
    <div className="space-y-6">
      <button onClick={() => setActiveTab('home')} className="text-blue-600 hover:underline mb-4">← Indietro</button>
      
      <h2 className="text-2xl font-bold text-gray-800">Diario della Gratitudine</h2>
      <p className="text-gray-600">Scrivere 3 cose per cui sei grata ogni giorno riduce l'ansia del 25% in sole 3 settimane.</p>

      <div className="bg-pink-50 border border-pink-200 rounded-lg p-5">
        <h3 className="font-semibold mb-3">Oggi sono grata per:</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={gratitudeInput}
            onChange={(e) => setGratitudeInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addGratitude()}
            placeholder="Anche piccole cose: un caffè buono, un sorriso..."
            className="w-full p-3 border border-pink-300 rounded-lg"
          />
          <button
            onClick={addGratitude}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors w-full"
          >
            Aggiungi
          </button>
        </div>
      </div>

      {gratitudeItems.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Le tue gratitudini:</h3>
          {gratitudeItems.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 flex items-start gap-2">
              <span className="text-pink-500">💕</span>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700"><strong>Suggerimento:</strong> Fallo ogni sera prima di dormire. Il tuo cervello inizierà a cercare automaticamente cose positive durante la giornata.</p>
      </div>
    </div>
  );

  const renderMovement = () => (
    <div className="space-y-6">
      <button onClick={() => setActiveTab('home')} className="text-blue-600 hover:underline mb-4">← Indietro</button>
      
      <h2 className="text-2xl font-bold text-gray-800">Movimento Anti-Ansia</h2>
      <p className="text-gray-600">L'ansia accumula tensione nel corpo. Il movimento la rilascia.</p>

      <div className="space-y-4">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-2">🏃‍♀️ Movimento veloce (5-10 min)</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Salta sul posto 30 secondi</li>
            <li>• Corri su e giù per le scale</li>
            <li>• Balla su 2-3 canzoni che ami</li>
            <li>• Fai una camminata veloce fuori</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3 italic">Il movimento intenso brucia il cortisolo (ormone dello stress).</p>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-2">🧘‍♀️ Stretching calmante (10 min)</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Rotola le spalle avanti e indietro lentamente</li>
            <li>• Inclina la testa da un lato, poi dall'altro (20 sec per lato)</li>
            <li>• Piegati in avanti e lascia penzolare le braccia</li>
            <li>• Apri il petto: mani dietro la schiena, allunga</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3 italic">Lo stretching dice al sistema nervoso che sei al sicuro.</p>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
          <h3 className="font-semibold text-lg mb-2">🤗 Rilascio tensione (2 min)</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Stringi i pugni forte per 10 secondi, poi rilascia</li>
            <li>• Alza le spalle alle orecchie, tieni, rilascia</li>
            <li>• Stringi tutto il viso, poi rilassa</li>
            <li>• Ripeti 3 volte ciascuno</li>
          </ul>
          <p className="text-xs text-gray-600 mt-3 italic">La tensione progressiva insegna al corpo a riconoscere e rilasciare lo stress.</p>
        </div>
      </div>
    </div>
  );

  const renderEvening = () => (
    <div className="space-y-6">
      <button onClick={() => setActiveTab('home')} className="text-blue-600 hover:underline mb-4">← Indietro</button>
      
      <h2 className="text-2xl font-bold text-gray-800">Routine Serale Anti-Ansia</h2>
      <p className="text-gray-600">La sera è quando l'ansia colpisce di più. Una routine ti protegge.</p>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
        <h3 className="font-semibold mb-3">⏰ 2 ore prima di dormire:</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span>📵</span>
            <div>
              <strong>Stop schermi luminosi</strong>
              <p className="text-gray-600">La luce blu aumenta l'attivazione. Usa modalità notte o occhiali blue-light.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>☕</span>
            <div>
              <strong>No caffeina dopo le 14:00</strong>
              <p className="text-gray-600">La caffeina resta in circolo per 6-8 ore.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h3 className="font-semibold mb-3">⏰ 1 ora prima di dormire:</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span>🛁</span>
            <div>
              <strong>Doccia o bagno caldo</strong>
              <p className="text-gray-600">Il calo di temperatura dopo aiuta a dormire.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>📝</span>
            <div>
              <strong>Brain dump (scarico mentale)</strong>
              <p className="text-gray-600">Scrivi tutto ciò che ti preoccupa. Chiudi il quaderno. "Lo gestirò domani."</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>📖</span>
            <div>
              <strong>Lettura leggera</strong>
              <p className="text-gray-600">Niente thriller o notizie. Qualcosa di piacevole e tranquillo.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <h3 className="font-semibold mb-3">🌙 A letto:</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span>🎧</span>
            <div>
              <strong>Audio rilassante</strong>
              <p className="text-gray-600">Meditazioni guidate, rumori bianchi, o musica a 432hz.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>❄️</span>
            <div>
              <strong>Stanza fresca (18-19°C)</strong>
              <p className="text-gray-600">Il corpo dorme meglio al fresco.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm"><strong>⚠️ Se non riesci a dormire dopo 20 minuti:</strong></p>
        <p className="text-sm text-gray-700 mt-2">Alzati. Vai in un'altra stanza. Fai qualcosa di noioso finché non hai sonno. NON restare a letto sveglia - il tuo cervello deve associare il letto solo al sonno.</p>
      </div>
    </div>
  );

  const renderThoughts = () => (
    <div className="space-y-6">
      <button onClick={() => setActiveTab('home')} className="text-blue-600 hover:underline mb-4">← Indietro</button>
      
      <h2 className="text-2xl font-bold text-gray-800">Pensieri Che Aiutano</h2>
      <p className="text-gray-600">Frasi da ripeterti quando l'ansia prende il sopravvento.</p>

      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="font-medium text-gray-800">"Questo è temporaneo. L'ansia è un'onda: sale, ma poi scende sempre."</p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="font-medium text-gray-800">"Il mio corpo sta reagendo a un pensiero, non a un pericolo reale."</p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
          <p className="font-medium text-gray-800">"Non devo controllare tutto. Va bene non sapere."</p>
        </div>

        <div className="bg-pink-50 border-l-4 border-pink-500 p-4">
          <p className="font-medium text-gray-800">"Ho superato il 100% delle giornate difficili finora. Ce la farò anche stavolta."</p>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
          <p className="font-medium text-gray-800">"Sono al sicuro in questo momento. Respiro, ed esisto."</p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <p className="font-medium text-gray-800">"Non devo essere perfetta. Posso essere semplicemente me stessa."</p>
        </div>

        <div className="bg-teal-50 border-l-4 border-teal-500 p-4">
          <p className="font-medium text-gray-800">"I miei pensieri ansiosi non sono fatti. Sono solo... pensieri."</p>
        </div>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
          <p className="font-medium text-gray-800">"Questo sentimento passerà. Tutto passa."</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-6">
        <h3 className="font-semibold mb-3">💡 Come usarle:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Scegli 2-3 frasi che risuonano con te</li>
          <li>• Scrivile su un post-it, salvale nel telefono</li>
          <li>• Quando l'ansia arriva, ripetile lentamente 5 volte</li>
          <li>• Respira tra una ripetizione e l'altra</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 min-h-[600px]">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'breath' && renderBreath()}
        {activeTab === 'grounding' && renderGrounding()}
        {activeTab === 'gratitude' && renderGratitude()}
        {activeTab === 'movement' && renderMovement()}
        {activeTab === 'evening' && renderEvening()}
        {activeTab === 'thoughts' && renderThoughts()}
      </div>

      <div className="max-w-2xl mx-auto mt-4 text-center text-sm text-gray-600">
        <p>💙 Ricorda: chiedere aiuto professionale è un segno di forza, non di debolezza.</p>
      </div>
    </div>
  );
}
