// src/components/CopilotChat.jsx
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';

export default function CopilotChat() {
  return (
    <CopilotKit
      publicApiKey="ck_pub_fa132467e76902e010cad2c2bf8b5ccc"
      chatApiEndpoint="https://myserver-coral.vercel.app/copilotkit/chat" // Your Express endpoint
    >
      <CopilotSidebar
        primaryColor="#1a3a27"
        defaultOpen={false}
        labels={{
          title: "Your AI Assistant",
          initial: "Hello! How can I help you today?",
        }}
        clickOutsideToClose={true}
      />
    </CopilotKit>
  );
}